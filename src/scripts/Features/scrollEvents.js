export const cardViewObserver = new IntersectionObserver((entries, observer) => {
	if(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1'
                entry.target.style.transform = 'translateY(0)'
                observer.unobserve(entry.target)
            }
        })	
	}
})

export const cardImgObserver = new IntersectionObserver((entries, observer) => {
    	
        entries.forEach(entry => {
         if(entry.isIntersecting) {  
                   
            entry.target.src = entry.target.dataset.src
            observer.unobserve(entry.target)
         }
        })
  
})
