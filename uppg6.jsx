
class App extends React.Component
{
	constructor (props) {
		super(props);
		var initList = JSON.parse(localStorage.getItem("myList"))
									 || ['First one', 'Another one', 'Yep this one', 'The last one'];
		this.state = {
			listItems: initList,
			userInput: ''
		};

		this.myListHandleClick = this.myListHandleClick.bind(this);
		this.myFormHandleSubmit = this.myFormHandleSubmit.bind(this);
		this.myFormHandleChange = this.myFormHandleChange.bind(this);
	}

	myListHandleClick (event) {
		var el = event.target;
		var index = Array.prototype.indexOf.call(el.parentNode.childNodes, el);
		var newListItems = this.state.listItems.slice(); // copy array
		var newState = {
			userInput: newListItems.splice(index, 1)[0] || "",
			listItems: newListItems
		};
		this.setState(newState, this.saveSession);
	}

	myFormHandleSubmit (event) {
		var userInput = this.state.userInput;
		var newListItems = this.state.listItems.slice().concat([userInput]);
		var newState = {
			userInput: '',
			listItems: newListItems
		}
		this.setState(newState, this.saveSession);
		event.preventDefault();
	}

	myFormHandleChange (event) {
		this.setState({userInput: event.target.value});
	}

 	saveSession() {
		localStorage.setItem("myList", JSON.stringify(this.state.listItems));
	}

	render () {
		return <div>
			<MyForm item={this.state.userInput}
							handleChange={this.myFormHandleChange}
				 			handleSubmit={this.myFormHandleSubmit} />

			<MyList list={this.state.listItems}
							handleClick={this.myListHandleClick} />
    </div>;
	}
}

class MyForm extends React.Component
{
	render () {
		return <form onSubmit={this.props.handleSubmit}>
			<input
				type="text" placeholder="input"
				onChange={this.props.handleChange}
				value={this.props.item}
			/>
      <button type="submit">Lägg till</button>
    </form>;
	}
}

class MyList extends React.Component
{
	render () {
		return <ul>
      {this.props.list.map( (data,i) =>
        <li onClick={this.props.handleClick} key={i}>{data}</li>
      )}
    </ul>;
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
