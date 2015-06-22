/**
 * @author Matthew FOster
 * @date   September 10th 2007
 */
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

Date.prototype.succ = function(){
		var ret = new Date(this.getTime());
		ret.setDate(this.getDate() + 1);
		return ret;
	}
Date.prototype.isLeapYear = function() {
	var year = this.getFullYear();
	return ((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
}
	
var GregorianCalendar = Class.create();
	
Object.extend(Object.extend(GregorianCalendar.prototype, ObjectRange.prototype),
				{
					MONTH_MAP : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					//             J  F  M  A  M  J  J  A  S  O  N  D
					DAY_MAX_MAP : [31,00,31,30,31,30,31,31,30,31,30,31],
					initialize : function(year, month){
						
						this.date = this.buildDate(year, month);
						this.start = this.buildStart(this.date);
						this.end = this.buildEnd(this.date);
						
					},
					buildDate : function(year, month){
						var d = false;
						if(year instanceof Date){
							d = year;
						}
						else{
							d = new Date();
							d.setYear(year);
							d.setMonth(month);
							}							
											
						d.setDate(1);
						d.setHours(0);
						d.setMinutes(0);
						d.setSeconds(0);
						d.setMilliseconds(0);
						
						return d;
					
					},
					buildStart : function(date){
						
						return new Date(date.getTime());
						
					},
					buildEnd : function(date){
						
						var month = date.getMonth();
						var maxDays = this.DAY_MAX_MAP[month];
						
						if(maxDays == 0)
							maxDays = this.getFebruaryMax();
						
						this.setMaxDays(maxDays);
						
						return new Date(date.getFullYear(),date.getMonth(),maxDays);
					
					},
					getFebruaryMax : function(){
						
						return (this.date.isLeapYear()) ? 29 : 28;
					
					},
					setMaxDays : function(num){
						this.maxDays = num;
					},
					getMaxDays : function(){
						return this.maxDays || 0;
					},
					getNextMonth : function(){
						
						return this.buildDate(this.date.getFullYear(), this.date.getMonth()+1);
						
					},
					getDate : function(){
						
						return this.date;
						
					},
					getPreviousMonth : function(){
						
						return this.buildDate(this.date.getFullYear(), this.date.getMonth()-1);
												
					},
					succ : function(){
						
						return new GregorianCalendar(this.getNextMonth());
					
					}
				}
			);