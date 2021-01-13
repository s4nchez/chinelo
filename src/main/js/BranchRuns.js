import React from "react";

export class BranchRuns extends React.Component {

    render() {
        console.log(this.props.job_runs)
        return (
            <div>
                <span>{this.props.branch}</span>
                <ul>{this.props.job_runs.map(run =>
                    <li>{run.name}</li>
                )}
                </ul>
            </div>
        )
    }
}