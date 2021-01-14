import React from "react";
import {capitalize, replace, split, truncate} from "lodash/string";
import {last} from "lodash/array";
import moment from "moment";

function prettifyName(runElement) {
    return capitalize(replace(replace(last(split(runElement, '/')), '.yaml', ''), '_', ' '))
}

export class CommitRuns extends React.Component {

    render() {
        let sha = truncate(this.props.commit['id'], {length: 7, omission: ''})
        let sha_created_at = moment(this.props.commit['timestamp']).fromNow()
        let message = truncate(this.props.commit['message'], {length: 80})
        let runs = this.props.runs.map(run => {
            return {id: run['id'], name: prettifyName(run['name']), status: run['status']}
        })
        return <div className="CommitRuns">
            <div className="commit">{sha} - {message}</div>
            <ul>
                {runs.map(run => {
                    return <li className={`run ${run.status}`} key={run.id} title={`${run.name} - ${run.status}`} ><div className="details">{run.name}</div></li>
                    }
                )}
            </ul>
        </div>
    }
}
