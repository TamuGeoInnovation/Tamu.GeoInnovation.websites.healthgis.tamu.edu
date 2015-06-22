/**
 * @author Matthew Foster
 * @date   December 27th 2007
 */
	var LabeledCalendar = Class.create();
	
	Object.extend(Object.extend(LabeledCalendar.prototype, CalendarSelect.prototype),
					{									
						initialize : function(){
							
							CalendarSelect.prototype.initialize.apply(this, arguments);
							
							this.injectHeader(this.createHeader());
							
						
						},
						createHeader : function(){
							
							var headerRow = $C("tr", { className : "header"});
							var headerCell = $C("th", {  innerHTML : this.range.MONTH_MAP[this.range.getDate().getMonth()] + ", " + this.range.getDate().getFullYear() });
							headerRow.appendChild(headerCell);							
							headerCell.setAttribute("colSpan", this.options.weekLength);
							
							return headerRow;					
										
						},
						injectHeader : function(header){
							
							try{
								this.tbody.insertBefore(header, this.tbody.firstChild);								
							}
							catch(e){
								try{
									this.table.insertBefore(header, this.table.firstChild);								
								}
								catch(e2){
									this.table.appendChild(header);
								}							
							}						
						}
					}
				);
		