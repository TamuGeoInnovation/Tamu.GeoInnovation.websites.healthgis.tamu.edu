/**
 * @author Matthew Foster
 * @date   December 27th 2007
 */
 
 var MultiCalendar = Class.create();
		
	Object.extend(Object.extend(MultiCalendar.prototype, MultiCalendarBase.prototype),
									{
										
										initialize : function(container, options){
											
											this.calendarList = [];
											
											this.buildInterface(container);
											this.buildOptions(options);
											this.createListener();
											this.attachListener();	
											
											this.buildCalendarSetup();
											this.setItemIncrement(this.view.down("td").getWidth());
																		
										},
										createListener : function(){
											
											this.nextHandle = this.handleNext.bindAsEventListener(this);
											this.prevHandle = this.handlePrev.bindAsEventListener(this);
										
										},
										attachListener : function(){
											
											this.nextControl.observe("click", this.nextHandle);
											this.prevControl.observe("click", this.prevHandle);
										
										},
										handleNext : function(e){
											
											if((this.wrap.scrollLeft + this.getItemIncrement() + this.wrap.getWidth()) > (this.wrap.scrollWidth - this.options.buffer))
												this.createAppendCalendar();											
																				
											this.scrollRight();
											
										},
										handlePrev : function(e){
											
											if((this.wrap.scrollLeft - this.options.buffer) < this.getItemIncrement())
												this.createPrependCalendar();
											
											this.scrollLeft();
																					
										},
										createPrependCalendar : function(){
																					
											var date = this.view.firstChild.calendar.range.getPreviousMonth();
											 
											var ele = this.buildCalendar(date);
											
											this.insertCalendar(ele);											
										
										},
										createAppendCalendar : function(){
											var date = this.view.lastChild.calendar.range.getNextMonth();
											 
											var ele = this.buildCalendar(date);
											
											this.appendCalendar(ele);
										
										},						
										buildCalendarSetup : function(){
											
											var range = this.getInitialRange();
																						
											var calendarCollection = range.collect(this.buildCalendar.bind(this));
											
											calendarCollection.each(function(cell){
																		
																		this.view.appendChild(cell);
																		
																	}.bind(this));											
										
										},
										
										buildCalendar : function(calendar){
											
											var element = $C("td", { className : "calendar" });
																						
											var date = "";
											
											if(calendar instanceof Date)
												date = calendar;
											else
												date = calendar.getDate();
											
											var builtCalendar = new LabeledCalendar(element, { date : date });
											
											element.calendar = builtCalendar;
											
											this.attachSubCalendarListener(builtCalendar);
											
											return element;
										
										},
										attachSubCalendarListener : function(cal){
										
											return false;
										
										}	
									
									}
							);