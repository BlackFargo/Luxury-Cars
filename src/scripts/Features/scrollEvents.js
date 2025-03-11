export const cardViewObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
          
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
         
            const images = entry.target.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.01 });


// export const cardImgObserver = new IntersectionObserver((entries, observer) => {
    	
//         entries.forEach(entry => {
//          if(entry.isIntersecting) {  
                   
//             entry.target.src = entry.target.dataset.src
//             observer.unobserve(entry.target)
//          }
//         })
  
// })
