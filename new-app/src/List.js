import React from 'react';

class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list: [],
			size: 0,
		}
	}
	add(){
		let item = document.getElementById("input").value;
		document.getElementById("input").value = "";
		if(!item.replace(/\s/g, '').length)
			return;
		let num = this.state.size + 1;
		this.setState({
			size: this.state.size + 1,
			list: [...this.state.list, {name: item, id: num}],
		})
	}
	delete(id){
		if(!window.confirm("Confirm Delete"))
			return;
		this.setState({
			list: [...this.state.list.filter((item) => item.id != id)],
		})
	}
	
	handleEvent(e){
		window.addEventListener('submit', (event) => {
			event.preventDefault()	
		});
		this.add()
	}
	
	renderList(){
		return(
		<html>
			<body>
		  		<div id = "header">TO DO LIST</div>
		  		<div id = "container"><form id = "form" onSubmit= {(e) => this.handleEvent(e)}><input id = "input" type = "text" placeholder = "Add Item"/>
				<input type="button" id = "button" value ="+" onClick = {() => this.add()}/>
		  		</form>
		  		</div>
		  		<div id = "list">
		  		{this.state.list.map((ele, index) =>
		  		<div class = "items" id = {ele.id} onClick = {() => this.delete(ele.id)}>{index+1}. {ele.name}</div>)}
		  		</div>
		  		<script>
				</script>
				
		  	</body>
		 </html>
		  );
			
	}
	render(){
		return(
			this.renderList()		
		)
	}
}

export default List;
