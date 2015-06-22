/**
 * @author Matthew Foster
 * @date   December 27th 2007
 */
 
 var MultiCalendarChooser = Class.create();
	
	
	Object.extend(Object.extend(MultiCalendarChooser.prototype, MultiCalendar.prototype),
					{
						
						primeComponent : function(){
							
							this.setActiveInput(this.startInput, this.endInput);
						
						},
						buildInterface : function(container){
						
							 MultiCalendar.prototype.buildInterface.apply(this, arguments);
							 this.staticReference = {};
							 this.startInput = this.container.down("input[name=start]");
							 this.endInput = this.container.down("input[name=end]");
							 						
						
						},
						createListener : function(){
						
							MultiCalendar.prototype.createListener.apply(this, arguments);
							
							this.startFocusHandle = this.handleStartFocus.bindAsEventListener(this);
							this.endFocusHandle = this.handleEndFocus.bindAsEventListener(this);
													
							this.cellClickHandle = this.handleCellClick.bind(this);
							this.cellOverHandle = this.handleCellOver.bind(this);
							this.cellOutHandle = this.handleCellOut.bind(this);
														
							
						},
						attachListener : function(){
							
							MultiCalendar.prototype.attachListener.apply(this, arguments);
							
							this.startInput.observe("focus", this.startFocusHandle);
							this.endInput.observe("focus", this.endFocusHandle);
							
							this.startInput.collectNodes = this.collectPast.bind(this);
							this.endInput.collectNodes = this.collectFuture.bind(this);
							
						
						},
						handleStartFocus : function(){
						
							this.setActiveInput(this.startInput, this.endInput);
							
						
						}, 
						handleEndFocus : function(){
											
							this.setActiveInput(this.endInput, this.startInput);
						
						
						},
						collectPast : function(ele){
							
							var collection = [];
							
							var localCells = ele.previousSiblings();
							
							var districtRows = ele.up("tr").previousSiblings();
							
							var foreignTable = ele.up(".calendar").previousSiblings();
							
							collection = collection.concat(localCells, districtRows, foreignTable);
							
							return collection;						
						
						},
						collectFuture : function(ele){
							
							var collection = [];
							
							var localCells = ele.nextSiblings();
							
							var districtRows = ele.up("tr").nextSiblings();
							
							var foreignTable = ele.up(".calendar").nextSiblings();
							
							collection = collection.concat(localCells, districtRows, foreignTable);
							
							return collection;
						
						},
						setActiveInput : function(activeObj, dormantObj){
							
							activeObj.addClassName("active");
							dormantObj.removeClassName("active");
							this.setObservingInput(activeObj);						
						
						},
						setObservingInput : function(obj){
							
							this.observingInput = obj;
						
						},
						hasObservingInput : function(){
							
							return this.getObservingInput() != this.staticReference;
						
						},
						getObservingInput : function(){
						
							return this.observingInput || this.staticReference;
						
						},
						attachSubCalendarListener : function(cal){
							
							cal.addEventListener("cellclick", this.cellClickHandle);
							cal.addEventListener("cellover", this.cellOverHandle);
							cal.addEventListener("cellout", this.cellOutHandle);
													
						},						
						handleCellClick : function(e){
							
							var ele = Event.element(e);
							var d =  ele.date;
														
							if(!(d && this.hasObservingInput() && this.validDate(d)))
								return false;
														
							
							try{
								this.getObservingInputPartner().removeClassName("selected");
								this.clearObservingCollection();
							}
							catch(e){
								//shh
							}
							
							if(this.getObservingInput() == this.startInput)
								try{
									this.endInput.value = "";
									this.endInput.partner.removeClassName("selected");									
									this.endInput.collection.invoke("removeClassName", "disabled");
								}
								catch(e){
									//shh
								}
							else
								this.dispatchEvent("change", [this.startInput.date, d]);
							
							
							this.getObservingInput().value = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
							
							this.setObservingInputDate(d);
							this.setObserveringInputPartner(ele);
							this.disableNodes(ele);
							
							ele.addClassName("selected");							
							
							if(this.getObservingInput() == this.startInput)
								this.setActiveInput(this.endInput, this.startInput);
							else
								this.setActiveInput(this.startInput, this.endInput);
																						
						
						},
						validDate : function(d){
							/*	
							if(this.getObservingInput() == this.startInput && this.endInput.date)
								return this.endInput.date >= d;
							*/
							if(this.getObservingInput() == this.endInput && this.startInput.date)
								return this.startInput.date <= d;
							
							else
								return true;
								
								
						},
						setObservingInputDate : function(d){
							
							this.getObservingInput().date = d;
						
						},
						getObservingInputDate : function(){
							
							return this.getObservingInput().date || false;
						
						},
						disableNodes : function(ele){
							
							var collection = this.getObservingInput().collectNodes(ele);
							
							this.setObservingCollection(collection);
							
							collection.invoke("addClassName", "disabled");
													
						},
						setObservingCollection : function(collection){
							
							this.getObservingInput().collection = collection;
						
						},
						getObservingCollection : function(){
						
							return this.getObservingInput().collection;
						
						},
						clearObservingCollection : function(){
							
							this.getObservingInput().collection.invoke("removeClassName", "disabled");
						
						},
						handleCellOver : function(e){
							
							var ele = Event.element(e);
							ele.addClassName("active");
							
						},
						handleCellOut : function(e){
							
							var ele = Event.element(e);
							ele.removeClassName("active");						
							
						},						
						setObserveringInputPartner : function(obj){
							
							this.getObservingInput().partner = obj;
																			
						},
						getObservingInputPartner : function(){
						
							return this.getObservingInput().partner || false;
							
						}					
					}
				);