/**
 * @author Matthew FOster
 * @date   September 10th 2007
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
var CalendarSelect = Class.create();
	
Object.extend(Object.extend(CalendarSelect.prototype, GridBuild.prototype),
					{
					
						initialize : function(container, options){
							
							this.options = Object.extend({ weekLength : 7, endWeek : 6, date : new Date()}, options || {});
							
							this.container = $(container);
							this.range = this.buildCalendarRange(this.options.date);
						
							this.monthDTO = this.buildCalendarDTO(this.range);
							
							this.createTable(this.monthDTO);
							
							this.createListener();
							this.applyBehavior();
							
							this.loadJSON(this.monthDTO);
						
						},
						getCell : function(row, cell){
								
								var ret = this.tbody.childNodes[row].childNodes[cell];
						
								if(ret)
									return ret;
								else
									return GridBuild.prototype.getCell.apply(this, arguments);
							
						},
						createListener : function(){ 
						
							GridBuild.prototype.createListener.apply(this, arguments);
						
							this.dayClickHandle = this.handleDayClick.bindAsEventListener(this);
						
						},							
						createTable : function(arr){
							var table = this.buildGrid(this.options.weekLength, arr.length);
							
							this.setTable(table);
																				
							this.container.appendChild(this.table);
							
							this.tbody = table.getElementsByTagName("tbody").item(0);
														
						},
						buildCalendarRange : function(date, month){
						
							return new GregorianCalendar(date, month);
							
						},
						applyCellJSON : function(row, obj, cell){
														
							var cellNode = this.getCell(row, cell);
							
							if(!(cellNode && obj instanceof Date))
								return false;
								
							//if it passed test it must be a valid day, so apply a dateclick observer
							Event.observe(cellNode, "click", this.dayClickHandle);
							
							cellNode.innerHTML = obj.getDate();
							cellNode.date = obj;		
					
						},
						buildCalendarDTO : function(range){
							var monthArr = [];
							var week = [];								
							//load offset with bogus data
							range.start.getDay().times(function(itr){ week.push(undefined) });
							var self = this;
							range.each(function(date){
											 week.push(date);
											 if(date.getDay() == self.options.endWeek){
												monthArr.push(week);
												week = [];
											}
										});
							if(week.length > 0)
								monthArr.push(week);
								
							return monthArr;
							
						},					
						handleDayClick : function(e){
							
							this.dispatchEvent("dayclick", Event.element(e).date);
						
						}
						
					}
				);