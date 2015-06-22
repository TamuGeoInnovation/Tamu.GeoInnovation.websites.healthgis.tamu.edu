/**

Copyright (c) 2007 Matthew E. Foster

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var GridBase = function(){};
	
Object.extend(Object.extend(GridBase.prototype, EventDispatcher.prototype),
				{
					
					setTable : function(table){
						
						this.table = $(table);
											
					},
					getCell : function(row, cell){
					
						return this.table.down("tr", row).down("td", cell);
					
					},
					createListener : function(){
						
						this.createCellListener();
						this.createRowListener();
						this.createTableListener();
					
					},
					applyBehavior : function(){
						
						this.table.getElementsBySelector("td").each(this.attachCellListener.bind(this));
						this.table.getElementsBySelector("td").each(this.attachRowListener.bind(this));
						this.attachTableListener(this.table);			
					
					},
					createCellListener : function(){
					
						this.cellOverHandle = this.handleCellOver.bindAsEventListener(this);
						this.cellOutHandle = this.handleCellOut.bindAsEventListener(this);
						this.cellClickHandle = this.handleCellClick.bindAsEventListener(this);
						this.cellDownHandle = this.handleCellDown.bindAsEventListener(this);
						this.cellUpHandle = this.handleCellUp.bindAsEventListener(this);
						
					},
					createRowListener : function(){
					
						this.rowOverHandle = this.handleRowOver.bindAsEventListener(this);
						this.rowOutHandle = this.handleRowOut.bindAsEventListener(this);
												
					},
					createTableListener : function(){
						
						this.tableOverHandle = this.handleTableOver.bindAsEventListener(this);
						this.tableOutHandle = this.handleTableOut.bindAsEventListener(this);
						this.tableDownHandle = this.handleTableDown.bindAsEventListener(this);
						this.tableUpHandle	= this.handleTableUp.bindAsEventListener(this);				
					
					},
					attachCellListener : function(cell){
						
						Event.observe(cell, "click", this.cellClickHandle);
						Event.observe(cell, "mouseover", this.cellOverHandle);
						Event.observe(cell, "mouseout", this.cellOutHandle);
												
					},
					attachRowListener : function(row){
						
						Event.observe(row, "mouseover", this.rowOverHandle);
						Event.observe(row, "mouseout", this.rowOutHandle);
					
					},
					attachTableListener : function(table){
						
						Event.observe(table, "mouseover", this.tableOverHandle);
						Event.observe(table, "mouseout", this.tableOutHandle);
						Event.observe(table, "mousedown", this.tableDownHandle);
						Event.observe(table, "mouseup", this.tableUpHandle);
					
					
					},
					handleCellOver : function(e){
					
						this.dispatchEvent("cellover", e);
						if(this.mouseDown == true)
							this.dispatchEvent("celldown", e);
					
					},
					handleCellOut : function(e){
					
						this.dispatchEvent("cellout", e);
					
					},
					handleCellUp : function(e){
						
						this.dispatchEvent("cellup", e);
					
					},
					handleCellDown : function(e){
						
						this.dispatchEvent("celldown", e);
					
					},
					handleCellClick : function(e){
						
						this.dispatchEvent("cellclick", e);
												
					},
					handleRowOver : function(e){
					
						this.dispatchEvent("rowover", e);
						
					},
					handleRowOut : function(e){
					
						this.dispatchEvent("rowout", e);
					
					},
					handleTableOver : function(e){
						
						this.dispatchEvent("tableover", e);						
					
					},
					handleTableOut : function(e){
					
						this.dispatchEvent("tableout", e);
					
					},
					handleTableDown : function(e){
						
						this.mouseDown = true;
						this.dispatchEvent("tabledown", e);
					
					},
					handleTableUp : function(e){
					
						this.mouseDown = false;
						this.dispatchEvent("tableup", e);
					
					}
					
					
					
				
				}
			);
