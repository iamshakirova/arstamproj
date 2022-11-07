const accordion = document.getElementsByClassName('contentBx');
for(i = 0; i<accordion.length; i++){
    accordion[i].addEventListener('click', function(){
        this.classList.toggle('active')
    })
}

$('.prod-img').slick({
    nextArrow: '<i class="fa-solid fa-angle-right"></i>',
    prevArrow: '<i class="fa-solid fa-angle-left"></i>',
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

const menuLinks = document.querySelectorAll('.menu_link[data-goto]');
if(menuLinks.length > 0){
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  function onMenuLinkClick(e){
    const menuLink = e.target;
    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault()
    }
  }
}

let modal = document.getElementById('modalAdapt')
function showFirstAdapt(){
    modal.classList.add('active-modal')
}
function closeFirstAdapt(){
    modal.classList.remove('active-modal')
}


let formW = document.getElementById('form-window')
function showForm(){
    formW.classList.add('active-form')
}
function closeForm(){
    formW.classList.remove('active-form')
}

document.addEventListener('DOMContentLoaded', function(){ 
  const form = document.getElementById('form');
  form.addEventListener('submit' , formSend);

  async function formSend(e){
    e.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);
    formData.append('image', formImage.files[0]);

    if(error===0){
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if(response.ok){
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      }else{
        alert('Ошибка');
      }
      form.classList.remove('_sending');


    }
  }

  function formValidate(form){
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for(let index = 0; index < formReq.length; index++){
      const input = formReq[index];
      formRemoveError(input);

      if(input.classList.contains('_email')){
        if(emailTest(input)){
          formAddError(input);
          error++;
        }
      // }else if(input.getAttribute("type") === "checkbox" && input.checked === false){
      //   formAddError(input);
      //   error++;
      }else{
        if(input.value === ''){
          formAddError(input);
          error++;
        }
      }

    }
    return error;
  }
  function formAddError(input){
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input){
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  const formImage = document.getElementById('formImage');
  const formPreview = document.getElementById('formPreview');

  formImage.addEventListener('change',() => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file){
    if(!['image/jpeg' ,'image/png', 'image/gif', 'image/jpg'].includes(file.type)){
      alert('Разрешены только изображения.');
      formImage.value = '';
      return;
    }
    if(file.size > 2 * 1024 * 1024){
      alert('Файл должен быть менее 2 МБ.');
      return;
    }
  
  var reader = new FileReader();
  reader.onload = function(e){
    formPreview.innerHTML = `<img src ="${e.target.result}" alt="Фото">`;
  };
  reader.onerror = function(e){
    alert('Ошибка');
  };
    reader.readAsDataURL(file);
  }
});