/**
 * @author Matthew Foster
 * @date   December 27th 2007
 */
 
 	var GregorianCalendarRange = Class.create();
		
	Object.extend(Object.extend(GregorianCalendarRange.prototype, Enumerable),
					{
					  initialize: function(start, end) {
					  
						if(!(start instanceof GregorianCalendar) || !(end instanceof GregorianCalendar))
							throw { message : "both parameters sent to a GregorianCalendarRange must be of type GregorianCalendar" };
													
						this.start = start;
						this.end = end;
						
					  },					
					  _each: function(iterator) {
						var value = this.start;
						while (this.include(value)) {
						  iterator(value);
						  value = value.succ();
						}
					  },					
					  include: function(value) {
						if (value.getDate() < this.start.getDate())
						  return false;
						
						return value.getDate() <= this.end.getDate();
					  }
					});