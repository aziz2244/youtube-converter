const ItemCtrl = (function () {
  return {
    seleksi: function (url) {
      // For https://www.youtube.com/watch?v=Gs8pBBH6-FU
      if (url.length >= 28 && url.length <= 33) {
        let arr = url.split("/");
        let data = arr[3];
        return data;
      }
      // For https://youtu.be/iP3PcDNhJXI
      if (url.length >= 43) {
        let arr = url.split("=");
        let data = arr[1];
        return data;
      }

      // if (url.length >= 60 && url.length <= 74) {
      //   let arr = url.split("=");
      //   let data = arr[1];
      //   return data;
      // }
      return data;
    },
  };
})();

const Ui = (function () {
  const Selector = {
    url: ".url",
    btn: ".btn",
    alert: ".Alert",
  };
  return {
    getSelector: function () {
      return Selector;
    },
    exsekusi: function (id) {
      // window.location.reload();
      let html = `
     <iframe
      id="widgetIframe"
      width="100%"
      height="100%"
      src="https://ytmp3to.com/api/widget/all/${id}"
      allowtransparency="true"
      scrolling="no"
      style="border: none; display: none"
      ></iframe>`;

      document.querySelector(".aaa").innerHTML = html;
      iFrameResize({ log: false }, "#widgetIframe");
    },
    disabled: function () {
      document.querySelector(Selector.url).setAttribute("disabled", "disabled");
      document.querySelector(Selector.btn).setAttribute("disabled", "disabled");
    },
  };
})();
// https://www.youtube.com/watch?v=T08HqmaLFU0
const App = (function (ItemCtrl, Ui) {
  const selector = Ui.getSelector();
  function loadEvent() {
    document.querySelector(selector.btn).addEventListener("click", startEvent);

    document.querySelector(".relod").addEventListener("click", () => {
      window.location.reload();
    });
  }

  const startEvent = function (e) {
    if (document.querySelector(selector.url).value !== "") {
      const url = document.querySelector(selector.url).value,
        getId = ItemCtrl.seleksi(url);
      Ui.exsekusi(getId);

      document.querySelector(".loading").style.display = "block";

      setTimeout(() => {
        document.querySelector(".loading").style.display = "none";
        document.getElementById("widgetIframe").style.display = "block";
        document.querySelector(".relod").style.display = "block";
        Ui.disabled();
      }, 2500);
    } else {
      document.querySelector(selector.alert).style.display = "block";
      setTimeout(() => {
        document.querySelector(selector.alert).style.display = "none";
      }, 2000);
    }

    // https://youtu.be/iP3PcDNhJXI

    e.preventDefault();
  };

  return {
    init: function () {
      loadEvent();
    },
  };
})(ItemCtrl, Ui);

App.init();
