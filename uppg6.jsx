
class App extends React.Component
{
	constructor (props) {
		super(props);

		this.state = {
			listItems: JSON.parse(localStorage.getItem('myList')) || [],
			userInput: ''
		};

		this.myListHandleClick = this.myListHandleClick.bind(this);
		this.myFormHandleSubmit = this.myFormHandleSubmit.bind(this);
		this.myFormHandleChange = this.myFormHandleChange.bind(this);
		this.myBtnDefaultHandleClick = this.myBtnDefaultHandleClick.bind(this);
	}

	myListHandleClick (event) {
		var el = event.target;
		var index = Array.prototype.indexOf.call(el.parentNode.childNodes, el);
		var newListItems = this.state.listItems.slice(); // copy array
		var newState = {
			userInput: newListItems.splice(index, 1)[0].text || "", // pop element
			listItems: newListItems
		};
		this.setState(newState, this.saveSession);
	}

	myFormHandleSubmit (event) {
		var userInput = this.state.userInput;
		var newItem = {text: userInput, time: (new Date()).toString().slice(0,-15)};
		var newListItems = this.state.listItems.slice().concat([newItem]);
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

	myBtnDefaultHandleClick (event) {
		var defaults = [
				{text: 'A bike'},
				{text: 'Red socks'},
				{text: 'Lego'},
				{text: 'Peace on earth'} ];
		defaults.forEach( (el,i) => el.time = (new Date("2017-12-25 15:00:0"+i)).toString().slice(0,-15));

		this.setState({listItems: defaults}, this.saveSession);
	}

 	saveSession() {
		localStorage.setItem("myList", JSON.stringify(this.state.listItems));
	}

	render () {
		return <div>

			{this.state.listItems.length
				? <p>&bull; Hover over items to see time added</p>
				: <p>&nbsp;</p>
			}

			<MyForm item={this.state.userInput}
							handleChange={this.myFormHandleChange}
				 			handleSubmit={this.myFormHandleSubmit} />

			{this.state.listItems.length

				? <MyList list={this.state.listItems}
									handleClick={this.myListHandleClick} />
				: <MyBtnDefault
									handleClick={this.myBtnDefaultHandleClick} />
			}
    </div>;
	}
}

class MyBtnDefault extends React.Component {
	render () {
		return <div>
			<button className={css.btnDefault}
							onClick={this.props.handleClick}>Add default items</button>

			<span>This button will only be visible when there is no elements in the list</span>
		</div>;
	}
}

class MyForm extends React.Component
{
	render () {
		return <form onSubmit={this.props.handleSubmit}>
			<div className={css.inputWrap} data-mdc-auto-init="MDCTextfield">

				<input type="text" id="userInput" className={css.input}
					placeholder="Add an item"
					onChange={this.props.handleChange}
					value={this.props.item} required />

	      <button type="submit"
					className={css.btn}
					data-mdc-auto-init="MDCRipple">Add</button>

			</div>
    </form>;
	}
}

class MyList extends React.Component
{
	render () {
		return <ul className="mdc-list">

			{this.props.list.map( (item,i) =>
        <li key={i} className="mdc-list-item"
						onClick={this.props.handleClick}
						title={`Added on: ${item.time}`}>{item.text}

							<div className={css.edit}>
	     					<i className="material-icons">edit</i></div>
				</li>
      )}
    </ul>;
	}
}

const css = {
	inputWrap: `mdc-textfield
							mdc-textfield--upgraded`,
	inputLabel: `mdc-textfield__label`,
	input: `mdc-textfield__input`,
	btn: `mdc-button
				mdc-button--raised
				mdc-button--primary
				mdc-ripple-upgraded
				mdc-ripple-upgraded--background-active-fill
				mdc-ripple-upgraded--foreground-activation`,
	btnDefault: `mdc-button
							 mdc-button--raised
							 mdc-button--accent`,
	edit: `mdc-list-item__end-detail material-icons`
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
