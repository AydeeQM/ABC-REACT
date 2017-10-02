const answered = [];
class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answered: [],
        };
    }
    onChange(e) {
        e.preventDefault();
        const { setCurrent, setScore, question } = this.props;
        let selected = e.target.value;

        if (selected == question.correct) {
            setScore(this.props.score + 1);
        }
        var b = this.state.answered.concat([selected]);
        console.log(b);
        setCurrent(this.props.current + 1);
    }
    render() {
        const { question } = this.props;
        var percent = ((this.props.current - 1) / this.props.questions.length * 100);
        return (
            <div className="container text-center">
                <div>
                    <img src={question.imgSrc} alt="" />
                </div>
                <div className="position">
                    <span className="pull-left">{this.props.current} of {this.props.questions.length} answered</span>
                    <span className="pull-right">
                        <strong>Score: {this.props.score}</strong>
                    </span>
                </div>
                <hr />

                <div>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100" style={{ width: percent + '%' }}>
                            {percent}%
                            </div>
                    </div>
                </div>
                <div className="questionsList">
                    <h3>{question.text}</h3>
                    <ul className="list-group listposition">
                        {
                            this.props.question.options.map(choice => {
                                return (
                                    <li className="list-group-item" key={choice.id}>
                                        <label for="t-option"><input type="radio" onChange={e => this.onChange(e)} name={question.id} value={choice.id} /> {choice.text}</label>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }

}
class QuestionMark extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="questions">
                {
                    this.props.questions.map(question => {
                        if (question.id == this.props.current) {
                            return <Question question={question} key={question.id} {...this.props} />
                        }
                    })
                }
            </div>
        )
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render(e) {
        var percent = (this.props.score / this.props.questions.length * 100);
        return (
            <div className="progress-line">
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100" style={{ width: percent + '%' }}>
                        {percent}%
                     </div>
                </div>
                <div>
                <h2>You have {this.props.score} correct of the {this.props.questions.length} Question</h2>
                </div>
            </div>
        )
    }
}

const Trivia = React.createClass({
    getInitialState() {
        return {
            questions: [
                {
                    id: 1,
                    text: 'Which is the oldest airline in the world?',
                    imgSrc: 'img/foto1.png',
                    options: [
                        {
                            id: 'a',
                            text: 'Avianca'
                        },
                        {
                            id: 'b',
                            text: 'KLM'
                        },
                        {
                            id: 'c',
                            text: 'Qantas'
                        }
                    ],
                    correct: 'b'
                },
                {
                    id: 2,
                    text: 'Which is the largest port in the world?',
                    imgSrc: 'img/foto2.png',
                    options: [
                        {
                            id: 'a',
                            text: 'Port of Shangai'
                        },
                        {
                            id: 'b',
                            text: 'Port of Singapore'
                        },
                        {
                            id: 'c',
                            text: 'Port Rotterdam'
                        }
                    ],
                    correct: 'a'
                },
                {
                    id: 3,
                    text: 'What is the longest distance cycling backwards?',
                    imgSrc: 'img/foto3.png',
                    options: [
                        {
                            id: 'a',
                            text: '89.30 km'
                        },
                        {
                            id: 'b',
                            text: '675.10 km'
                        },
                        {
                            id: 'c',
                            text: '337.60 km'
                        }
                    ],
                    correct: 'c'
                },
                {
                    id: 4,
                    text: 'What is the highest speed ever reached by a school bus?',
                    imgSrc: 'img/foto5.png',
                    options: [
                        {
                            id: 'a',
                            text: '590 km/h'
                        },
                        {
                            id: 'b',
                            text: '320 km/h'
                        },
                        {
                            id: 'c',
                            text: '245 km/h'
                        }
                    ],
                    correct: 'a'
                },
                {
                    id: 5,
                    text: 'What is the longest car trip on one tank of gas?',
                    imgSrc: 'img/foto4.png',
                    options: [
                        {
                            id: 'a',
                            text: '2617 km'
                        },
                        {
                            id: 'b',
                            text: '3568 km'
                        },
                        {
                            id: 'c',
                            text: '1732 km'
                        }
                    ],
                    correct: 'a'
                }
            ],
            score: 0,
            current: 1
        }
    },
    setCurrent(current) {
        this.setState({ current });
    },
    setScore(score) {
        this.setState({ score });
    },
    render() {
        if (this.state.current > this.state.questions.length) {
            var results = <Results {...this.state} />;
        } else {
            var results = "";
        }
        return (
            <div>
                <QuestionMark  {...this.state} setCurrent={current => this.setCurrent(current)} setScore={score => this.setScore(score)} />
                {results}
            </div>
        )
    }
});

ReactDOM.render(
    <Trivia />,
    document.getElementById('container')
);
