function loadData(api, cb ){
    fetch(api)
        .then(res => res.json())
        .then(data => cb(data.categories || data.videos || data.category))
        .catch(err => console.error('Error loading data:', err));
}

function categoryLoad(data){
    const category = document.getElementById('category');
    data.forEach(element => {
        category.innerHTML += 
        `<button id="btn-${element.category_id}" class="btn-category p-2 bg-blue-500 hover:bg-blue-700 text-white rounded text-sm cursor-pointer" onclick="loadCategoryVideo(${element.category_id})" type="button" >${element.category}</button>
        `
    });
}
const removeActiveClass = ()=>{
    const generalbtnClass = document.getElementsByClassName('btn-category');
    for(let btn of generalbtnClass){
        btn.classList.remove('active');
    }
}
function loadCategoryVideo(id){
    removeActiveClass();
    const activeItem = document.getElementById(`btn-${id}`);
    activeItem.classList.add('active');
    loadData(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`, videoLoad);
}

function timeCalculate(date){
    const hrs = parseInt(date/3600);
    const minitue = parseInt((date % 3600)/60)
    if(!date){
        return '';
    }
    return `${hrs} hrs ${minitue} minitue ago`
}

function videoLoad(data){
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = "";
    videoContainer.classList.add('grid');
    if(data.length > 0) {
        data.forEach(element => {
            videoContainer.innerHTML += 
            ` <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#" class="w-full relative">
                    <img class="rounded-t-lg h-38 object-cover w-full" src="${element.thumbnail} alt="video thumbnil" />
                    <div class="absolute right-2 bottom-2 text-[8px] text-white rounded bg-black">
                        ${timeCalculate(element.others.posted_date)}
                    </div>
                </a>
                <div class="flex gap-2">
                    <div class="mt-1">
                        <img class="w-6 rounded-full" src='${element.authors[0].profile_picture}'>
                    </div>
                    <div>
                        <a href="#">
                            <h5 class="mb-1 text-md font-bold text-gray-900 dark:text-white">${element.title}</h5>
                        </a>
                        <div class="flex gap-2 items-center mt-0 pt-0">
                            <p class="text-xs font-normal text-gray-700 dark:text-gray-400">${element.authors[0].profile_name}</p>
                            ${element.authors[0].verified == true? `<img class="w-3" src="Group.png">` : ``}
                        
                        </div>
                        <p class="mt-[2px]text-xs font-semibold text-stone-400">${element.others.views}</p>
                    </div>
                </div>    
            </div>
            `
        });
    }else{
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class="w-full flex flex-col justify-center items-center gap-4">
                <img src="icon.png" class="w-[150px]" alt = "nothing here images"/>
                <p>Nothing Here, Move Another Category</p>
            </div>
        `
    }
}


// videos
loadData('https://openapi.programming-hero.com/api/phero-tube/categories', categoryLoad)

loadData('https://openapi.programming-hero.com/api/phero-tube/videos', videoLoad)