import React from "react";
import {groupBy} from "lodash/collection";
import {CommitRuns} from "./CommitRuns";

export class BranchRuns extends React.Component {

    render() {
        let commits = groupBy(this.props.job_runs, item => item['head_sha'])
        return (
            <div className="BranchRuns">
                <h3>{this.props.branch}</h3>
                <ul>
                    {Object.keys(commits).map(commit => {
                        let commit_runs = commits[commit]
                        let head_commit = commit_runs[0]['head_commit']
                        return <li key={head_commit['id']}><CommitRuns repo={this.props.repo} commit={head_commit} runs={commit_runs}/></li>
                        }
                    )}
                </ul>
            </div>
        )
    }
}