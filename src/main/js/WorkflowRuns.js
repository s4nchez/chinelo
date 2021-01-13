import React from "react";
import {groupBy} from "./Wtf";
import {BranchRuns} from "./BranchRuns";

export class WorkflowRuns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
        ;
    }

    componentDidMount() {
        this.loadWorkflowRuns();
        this.timer = setInterval(() => this.loadWorkflowRuns(), 10000);
    }

    componentWillUnmount() {
        this.timer = null
    }

    loadWorkflowRuns() {
        fetch(`https://api.github.com/repos/${this.props.repo}/actions/runs`)
            .then(res => res.json())
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
            return (
                <ul>
                    {Object.keys(items).map(branch =>
                        <li key={branch}><BranchRuns branch={branch} job_runs={items[branch]}/></li>
                    )}
                </ul>
            );
        }
    }
}