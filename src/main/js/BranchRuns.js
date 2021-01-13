import React from "react";
import {groupBy, map} from "lodash/collection";
import {CommitRuns} from "./CommitRuns";
import {truncate} from "lodash/string";

export class BranchRuns extends React.Component {

    render() {
        let commits = groupBy(this.props.job_runs, item => item['head_sha'])
        return (
            <div>
                <span>{this.props.branch}</span>
                <ul>
                    {Object.keys(commits).map(commit => {
                        let commit_runs = commits[commit]
                        let head_commit = commit_runs[0]['head_commit']
                        return <li key={head_commit['id']}><CommitRuns commit={head_commit} runs={commit_runs}/></li>
                        }
                    )}
                </ul>
            </div>
        )
    }
}