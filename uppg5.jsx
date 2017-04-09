// ========================== Part One =====================

class App1 extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = {userInput: ''};
  }

  render() {
    return <div>
      <input type="text"
             placeholder="Enter your text..."
             onChange={this.handleChange.bind(this)} />
      <span> {this.state.userInput || "Hello world!"}</span>
    </div>;
  }

  handleChange(e) {
    this.setState({userInput: e.target.value});
  }
}

ReactDOM.render(
  <App1 />,
  document.getElementById("app1")
);

// ========================== Part Two =====================

class App2 extends React.Component
{
  constructor() {
    super(...arguments);

    this.state = {
      InputA: '',
      InputB: '',
      Aritmetic: '+',
      calcResult: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var el  = e.target;
    var eln = el.placeholder
              ? el.placeholder.replace(" ", "")
              : "Aritmetic";

    var state;
    state = JSON.parse(JSON.stringify(this.state)); // copy obj
    state[eln] = el.value;
    state["calcResult"] = eval(
      Number(state.InputA) + state.Aritmetic + Number(state.InputB)
    );

    this.setState(state);
  }

  render() {
    return <div>
      <input type="text" size="10"
             placeholder="Input A"
             onChange={this.handleChange} />

      <select onChange={this.handleChange}>
        <option>+</option>
        <option>-</option>
        <option>*</option>
        <option>/</option></select>

      <input type="text" size="10"
              placeholder="Input B"
              onChange={this.handleChange} />

      <span> = {this.state.calcResult || "N/A"}</span>
    </div>;
  }
}

ReactDOM.render(
  <App2 />,
  document.getElementById("app2")
);

// ========================== Part Three =====================

class App3 extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = {btnCount: 3};
    this.myInputHandleChange = this.myInputHandleChange.bind(this);
    this.myButtonHandleClick = this.myButtonHandleClick.bind(this);
  }

  render() {
    const {
      btnCount,
      btnLastClick,
    } = this.state;

    return <div>
      <label>How many buttons do we want today? </label>

      <input type="text" size="5" defaultValue="3"
             onChange={this.myInputHandleChange} />

      {btnLastClick
        ? <p>You clicked: {btnLastClick}</p>
        : <p>Why don't you click a button below:</p>
      }

      {[...Array(btnCount)].map((x, i) => {
        var btnName = `Button ${i+1}`;
        return <MyButton key={i+1}
                         btnNumber={i+1}
                         btnClickCount={this.state[btnName]}
                         btnIsLastClicked={btnLastClick === btnName}
                         btnIsMostClicked={this._btnIsMostClicked(btnName)}
                         handleClick={this.myButtonHandleClick} />
      })}
    </div>;
  }

  myInputHandleChange(e) {
    var value = Number(e.target.value);

    if (value > 0)
      this.setState({ btnCount: value });
  }

  myButtonHandleClick(e) {
    var btnName = e.target.innerText;
    var btnClickCount = Number(e.target.nextSibling.innerText) || 0;

    this.setState({
      [btnName]: ++btnClickCount,
      btnLastClick: btnName
    });

    e.preventDefault(); // prevent highlight?
  }

  _btnIsMostClicked(btnName) {
    var high = {key: "", val: 0};

    for (let el in this.state) {
      if (el.substr(0,6) != "Button") continue;
      if (this.state[el] > high.val) high = {key: el, val: this.state[el]};
    };

    return (high.key === btnName);
  }
}

class MyButton extends React.Component
{
  render() {
    const {
      btnNumber,
      btnClickCount,
      btnIsLastClicked,
      btnIsMostClicked,
      handleClick,
    } = this.props;

    const classNames = `
      ${btnIsLastClicked ? "last" : ""}
      ${btnIsMostClicked ? "most" : ""}`;

    return <div>
      <button className={classNames}
              onClick={handleClick}
              >Button {btnNumber}</button>

      <span> {btnClickCount}</span>
    </div>;
  }
}

ReactDOM.render(
  <App3 />,
  document.getElementById("app3")
);
