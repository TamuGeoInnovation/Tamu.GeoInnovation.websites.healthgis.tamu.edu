/**
 * @author Matthew Foster
 * @date   December 27th 2007
 */
 
 	var MultiCalendarBase = Class.create();
	
	Object.extend(Object.extend(MultiCalendarBase.prototype, EventDispatcher.prototype),
						{
							
							buildInterface : function(container){
							
								this.container = $(container);
								this.view = this.container.down(".view");
								this.wrap = this.container.down(".wrap");
								this.control = this.container.down(".control");
								this.nextControl = this.control.down(".next");
								this.prevControl = this.control.down(".previous");
							
							},
							setItemIncrement : function(num){
								
								this.increment = num;
							
							},
							getItemIncrement : function(){
							
								return this.increment || 0;
								
							},
							buildOptions : function(options){
										
								this.options = Object.extend({ rangeOffset : 3, buffer : 25}, options || {});
																					
							},						
							createCalendar : function(element, date){
							
								return new LabeledCalendar(element, date);
							
							},
							scrollLeft : function(){
																
								this.wrap.scrollLeft -= this.getItemIncrement();
							
							},
							scrollRight : function(){
								
								this.wrap.scrollLeft += this.getItemIncrement();
							
							},
							insertCalendar : function(element){
							
								try{
									this.view.insertBefore(element, this.view.firstChild);
									}
								catch(e){
									this.appendCalendar(element);
								}
							
							},
							appendCalendar : function(element){
								
								this.view.appendChild(element);
							
							},
							getInitialRange : function(){
							
								var date = new Date();
								var start = new GregorianCalendar(date.getFullYear(), date.getMonth() -2);
								var end = new GregorianCalendar(date.getFullYear(),date.getMonth()+this.options.rangeOffset );
								
								return $A(new GregorianCalendarRange(start, end));
							
							}						
						}
					);