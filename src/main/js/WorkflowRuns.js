import React from "react";
import {BranchRuns} from "./BranchRuns";
import {filter, groupBy} from "lodash/collection";
import {offlineExample} from "./OfflineExample";
import {split, trim} from "lodash/string";

export class WorkflowRuns extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            repo: 'http4k/http4k',
            items: []
        };
        let path = window.location.pathname
        let fragments = filter(split(path, '/'), s => trim(s) !== '');
        if (fragments.length >= 2) {
            this.state.repo = fragments[fragments.length - 2] + "/" + fragments[fragments.length - 1]
        }
    }

    componentDidMount() {
        this.loadWorkflowRuns();
        this.timer = setInterval(() => this.loadWorkflowRuns(), 30000);
    }

    componentWillUnmount() {
        this.timer = null
    }

    loadData() {
        if (offlineExample) {
            console.log("USING OFFLINE EXAMPLE");
            return Promise.resolve(offlineExample);
        }
        return fetch(`https://api.github.com/repos/${this.state.repo}/actions/runs?per_page=100`)
            .then(res => res.json())
    }

    loadWorkflowRuns() {
        this.loadData()
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: groupBy(result['workflow_runs'], item => item['head_branch'])
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(this.state.repo)
            return (
                <div className="WorkflowRuns">
                    <h1>{this.state.repo}</h1>
                    <ul>
                        {Object.keys(items).map(branch =>
                            <li key={branch} className={branch}><BranchRuns repo={this.state.repo} branch={branch}
                                                                            job_runs={items[branch]}/>
                            </li>
                        )}
                    </ul>
                </div>
            );
        }
    }
}