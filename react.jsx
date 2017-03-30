
// ----------------------- App one -----------------------

var input1 = document.getElementById("input1");

input1.addEventListener("keyup", event =>
{
  ReactDOM.render(
    <App1 name={event.target.value}/>,
    document.getElementById('app1result')
  );

});

class App1 extends React.Component {render(){
  return (<p>{this.props.name}</p>);
}}


// ----------------------- App two -----------------------

class App2 extends React.Component {render()
{
  const input2A = (
    <input type="text" id="input2A" placeholder="Eneter value A" size="10"
      onChange={inputChange} />
  )
  const input2B = (
    <input type='text' id="input2B" placeholder="Eneter value B" size="10"
    onChange={inputChange} />
  );
  const inputArithmetic = (
    <select id="aritmetic" onChange={inputChange}>
      <option>+</option>
      <option>-</option>
      <option>*</option>
      <option>/</option>
    </select>
  );

  function inputChange() {
    var a = $("#input2A").value,
        b = $("#input2B").value,
        c = $("#aritmetic").value;

    $("#app2result").innerText = eval(
      Number(a) + c + Number(b)
    );
  }

  return (
    <p>{input2A} {inputArithmetic} {input2B}</p>
  );
}}

ReactDOM.render(
  <App2/>,
  document.getElementById('app2')
);

// ----------------------- App three A -----------------------

var AppData = ["serif", "sans-serif", "monospace", "cursive", "fantasy"];

class App3 extends React.Component {render()
{
  return <TheList items={AppData} />;
}}

ReactDOM.render(
  <App3/>,
  document.getElementById('app3')
);

function TheList(props)
{
  const listItems = props.items.map( item =>
    <ListItem key={item.toString()} value={item}/>
  );

  return <ul>{listItems}</ul>;
}

function ListItem(props)
{
  var style = {
    fontFamily: props.value
  };
  return <li style={style}>listitem {props.value}</li>;
}
// ----------------------- App three B -----------------------

class App3b extends React.Component
{
  constructor(props) {
    super(props);
    this.numClicks = 0;
    this.handleAppClick = this.handleAppClick.bind(this);
  }

  render() {
    return (<i onClick={this.handleAppClick}>
      <MyButton id="btn3a" />
      <MyButton id="btn3b" />
      <MyButton id="btn3c" />
    </i>);
  }

  handleAppClick(event)
  {
    console.log("handleAppClick", event.target.id);
    var btns = $("button");
    if (btns && btns.length === 0) return;

    var high = {el: null, count: null};
    btns.forEach( btn => {
      var c = Number(btn.value);
      if (c > high.count ||
         (c == high.count && btn == event.target)) high = {el: btn, count: c};
      btn.classList.remove("high");
    });

    high.el.classList.add("high");

    $("#app3bresult").innerText = ++this.numClicks;
  }
}

function MyButton(props)
{
  var numClicks = 0;

  return <button onClick={handleClick} id={props.id}>
    {props.id.toUpperCase().replace("BTN3", "Knapp ")}
  </button>;

  function handleClick(props) {
    var el = props.target;
    el.value = ++numClicks;
    el.innerText = el.innerText.replace(/(\d+)$/, "") + " " + numClicks;
    console.log("MyButton");
  }
}

ReactDOM.render(
  <App3b/>,
  document.getElementById('app3b')
);
// ----------------------- Santas little helper -----------------------

function $(str)
{
  var els = document.querySelectorAll(str);
  if (els.length === 1 && str.indexOf("#") > -1) return els[0];
  else if (els.length > 0) return Array.from(els);
  else return [];
}
