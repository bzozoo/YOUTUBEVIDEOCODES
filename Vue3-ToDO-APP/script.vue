<template>
	<input
		type="text"
		id="add"
		name="add"
		v-model="inputValue"
		placeholder="Add a panel..."
		required
	/>
	<button class="actionbuttons" id="addbutton" v-on:click="addPanel()">
		ADD
	</button>
	<div class="panel" v-for="(panel, panIndex) in panels.slice().reverse()">
		<div class="chkbox">
			<input type="checkbox" v-model="panel.status" />
			<div v-show="disabled">Panel Status: {{panel.status}}</div>
		</div>
		<div class="content">
			<span v-if="!panel.editable">{{ panel.content }}</span>
			<span
				v-if="panel.editable"
				v-bind:id="'pc_' + (panels.length - 1 - panIndex)"
				class="textarea editable"
				role="textbox"
			>
				{{ panel.content }}
			</span>
			<p class="dtfield">{{ formatedDate(panel.createdAt) }}</p>
		</div>
		<div class="actions">
			<button
				v-if="!panel.editable"
				v-on:click="panel.editable = !panel.editable"
				class="panelbutton edit"
				title="Edit"
			>
				<i class="fas fa-edit"></i>
			</button>
			<button
				v-if="panel.editable"
				v-on:click="
					editPanel(panels.length - 1 - panIndex),
					(panel.editable = !panel.editable)
				"
				class="panelbutton save"
				title="Save"
			>
				<i class="fas fa-save"></i>
			</button>
			<button
				v-on:click="deletePanel(panels.length - 1 - panIndex)"
				class="panelbutton delete"
				title="Delete"
			>
				<i class="fas fa-trash-alt"></i>
			</button>
		</div>
	</div>
	<button v-if="panels.length > 0" id="clearbutton" v-on:click="clearAllPanels()">CLEAR ALL PANELS</button>
</template>

<script>
export default {
	data() {
		return {
			inputValue: "",
			panels: []
		};
	},
	methods: {
		addPanel() {
			if (this.inputValue != "") {
				console.log("Add panel...");
				let now = new Date();
				this.panels.push({
					id: this.panels.length,
					content: this.inputValue,
					createdAt: now,
					editable: false,
					status: false
				});
				this.savePanels();
				this.inputValue = "";
			}
		},
		formatedDate(date) {
			return new Date(date).toLocaleString();
		},
		editPanel(panelID) {
			const selectedpanel = document.getElementById("pc_" + panelID);
			this.panels[panelID].content = selectedpanel.innerHTML;
		},
		deletePanel(number) {
			console.log("Delete panel ..." + number);
			this.panels.splice(number, 1);
			this.savePanels();
		},
		savePanels() {
			console.log("Save panels to local storage...");
			const jsonStringDatas = JSON.stringify(this.panels);
			localStorage.setItem("panels", jsonStringDatas);
		},
		clearAllPanels(){
			this.panels = []
		}
	},
	mounted() {
		if (localStorage.getItem("panels")) {
			this.panels = JSON.parse(localStorage.getItem("panels"));
		}
	},
	watch: {
		panels: {
			handler(){
				localStorage.setItem("panels", JSON.stringify(this.panels));	
			},
			deep: true
		},
	}
};
</script>

<style>
input#add {
	width: calc(100% - 1px);
	padding: 5px;
	font-size: 20px;
	border: 1px solid darkgreen;
	border-radius: 4px;
	box-sizing: border-box;
}
.actionbuttons {
	margin-top: 2px;
	margin-bottom: 3px;
	color: white;
	text-align: center;
	background-color: #4caf50;
	width: calc(100% - 1px);
	border: none;
	display: inline-block;
	border-radius: 4px;
	box-shadow: inset 0 1px 3px #ddd;
	padding: 12px 20px;
}
.actionbuttons:hover {
	background-color: #30992e;
}
.panel {
	display: flex;
	border: 1px solid darkgreen;
	background: white;
	border-radius: 5px;
	width: auto;
	margin: 2px 0;
	padding: 3px;
	color: darkgreen;
}
.content {
	width: 100%;
	word-break: break-all;
}
input[type="checkbox"] {
	margin-right: 10px;
	float: left;
}
.dtfield {
	color: grey;
	font-size: 10px;
	margin: 2px;
}
.actions {
	text-align: center;
}
.panelbutton {
	width: 55px;
	margin-bottom: 3px;
	text-align: center;
	color: white;
	padding: 5px 5px;
	border: none;
	border-radius: 2px;
}
.edit {
	background-color: #417a45;
}
.save {
	background-color: #7c9588;
}
.delete {
	background-color: #417a5d;
}
.textarea {
	background-color: #42b883;
	display: block;
	width: 100%;
	overflow: hidden;
	resize: both;
	min-height: 40px;
	line-height: 20px;
}
.textarea[contenteditable]:empty::before {
	content: "Placrholder still posible";
	color: gray;
}
	
span.editable {
		-webkit-user-modify: read-write;
		user-modify: read-write;
	}
</style>
