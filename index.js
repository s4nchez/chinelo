import React from "react";
import ReactDOM from "react-dom";

class WorkflowsRuns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        this.loadWorkflowRuns();
        this.timer = setInterval(()=> this.loadWorkflowRuns(), 10000);
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
                        items: result['workflow_runs']
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
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

const mountNode = document.getElementById("app");

ReactDOM.render(<WorkflowsRuns repo="http4k/http4k"/>, mountNode);