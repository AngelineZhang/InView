//import 'intersection-observer';

/*
* eleSelector is string : '.element-selector' , items container or targetElement
* callback is fn : to do something when the target meets a threshold specified
* options.root is element : node || null (default)，needed when there are scroll bar inside
* options.rootMargin is string : '100px 100px 100px 100px' || "0px 0px 200px 0px" default
* options.threshold is number or array : [0,0.2, ... , 1] || 0 (default)
* options.isTarget is boolean : null || true , if eleSelector is targetElement true
* */

class inView{
	constructor(eleSelector,callback,options)
	{
		this.options = {...options};
		this.element = document.querySelector(eleSelector);
		this.callback = callback;
		this.targetElement = null;
		this.observer = null;
		this.init();
	}

	init(){
		let configOption = {
			root:  this.options.root || null,
			rootMargin:  this.options.rootMargin || '0px 0px 200px 0px',
			threshold: this.options.threshold || 0
		};

		if(this.options.isTarget){
			this.targetElement = this.element;
		}
		else{
			this.targetElement = document.createElement('div');
			this.targetElement.classList.add('target-item');
			this.element.parentNode.insertBefore(this.targetElement,this.element.nextSibling);
		}
		this.observer = new IntersectionObserver((entries)=>{
			entries.forEach((entry)=>{
				console.log(entry);
				if(entry.isIntersecting )
				{
					this.callback && this.callback();
				}
			})
		},configOption);

		this.observer.observe(this.targetElement);
	}

   unobserve(){
		this.observer && this.observer.unobserve(this.targetElement);
		if(!this.options.isTarget){
			this.element.parentNode.removeChild(this.targetElement);
		}
	}
}

//export default inView;