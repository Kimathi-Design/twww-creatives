function imgChange(select, elem, list, imgs, wioi, heioi) {
  list.innerHTML = `<p>Legyen ${wioi}x${heioi} pixel!</p>`;
  select.addEventListener("click", function (e) {
    if (elem) {
      elem.click();
    }

    e.preventDefault();
  }, false);
  elem.addEventListener("change", handleFiles, false);

  function handleFiles() {
    if (!this.files.length) {
      list.innerHTML = `<p>Legyen ${wioi}x${heioi} pixel!</p>`;
    } else {
      for (let i = 0; i < this.files.length; i++) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(this.files[i]);
       /* img.height = heioi;*/

        img.onload = function () {
          let wit = img.width;
          let hei = img.height;

          if (wit === wioi && hei === heioi) {
            list.innerHTML = `<p>Szuper, tölts fel egy másikat, ha gondolod (${wioi}x${heioi})</p>`;
          } else {
           list.innerHTML = `<p>Ez nem ${wioi}x${heioi} pixeles, de reméljük így is jól néz majd ki! Tölts fel egy másikat, ha gondolod!</p>`;
          }

          setTimeout(function () {
            URL.revokeObjectURL(this.src);
            imgs.src = img.src;
          }, 100);
        };
      }
    }
  }
}

;