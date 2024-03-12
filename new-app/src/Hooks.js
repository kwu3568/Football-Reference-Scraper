import React, {useState, useEffect} from "react";

function Entry(props){

	const[text, setValue] = useState(props.value);
	function edit_item(){
		let prompt = window.prompt("Edit Item");
		if(prompt != null && prompt.length > 0){
			setValue(prompt);
		}
	}
	return <div className = "items"  key = {props.id}>{props.index}. {text}
		   	<div className = "content">
				<button className = "menu_button" type = "button" id = "edit_button" onClick = {() => edit_item()}>Edit</button>
				<button className = "menu_button" type = "button" id = "delete_button" onClick = {props.click}>Delete</button>
			</div>
		   </div> 
}
	
export default function Table(){

	const[list, setList] = useState(JSON.parse(localStorage.getItem("list") || "[]"));
	const[unique_id, setId] = useState(localStorage.getItem("id") || 0);

	/*useEffect(() => {
	    console.log(list.length);
	  }, [list]);
	*/	
	function add(){
	
		//localStorage.clear();
		//console.log(unique_id);
		/*if(localStorage.getItem("id") == null){
				localStorage.setItem("id", 1);
		}*/
		let item = document.getElementById("input").value;
		document.getElementById("input").value = "";
		if(!item.replace(/\s/g, '').length)
			return;
		//setList(list => [...list, {text: item, key: localStorage.getItem("id")}]);
		//localStorage.setItem("id", parseInt(localStorage.getItem("id") || "0") + 1);
		//localStorage.setItem("list", JSON.stringify(list));
		//console.log(localStorage.getItem("list"));
		let temp = JSON.parse(localStorage.getItem("list") || "[]");
		temp.push({text: item, key: unique_id});
		setList(temp);
		localStorage.setItem("list", JSON.stringify(temp));
		setId(unique_id + 1);
		localStorage.setItem("id", unique_id + 1);
		//console.log(list);
		
		//list.forEach((e) => console.log(e));
		//setId(id+1);
		//console.log(list[0].name);
	}
	function delete_item(id){

		if(!window.confirm("Confirm Delete"))
			return;


		let temp = JSON.parse(localStorage.getItem("list") || "[]");
		console.log(temp);
		temp = temp.filter((item) => item.key !== id);
		localStorage.setItem("list", JSON.stringify(temp));
		setList(temp);	
		//setList(list => [...list.filter((item) => item.key !== id)]);
		//list.forEach((e) => console.log(e));
		//document.getElementById("menu").style.visibility = "visible";
	}

	function stopRefresh(e){
		window.addEventListener('submit', (e) =>{
			e.preventDefault();	
		});
		add();
	}
	return(
		<>
				<div id = "header">To Do List</div>
				<div id = "container"><form id = "form" onSubmit= {(e) => stopRefresh(e)}><input id = "input" type = "text" placeholder = "Add Item"/>
				<button type = "button" id = "button" value ="+" onClick = {() => add()}>+</button>
				</form>
				<div id = "list">
				{list.map((ele, index) =>
				<Entry key = {ele.key} index = {index+1} value = {ele.text} click = {() => delete_item(ele.key)}/>
				)} 
				</div>
				</div>
		</>
	)
}
