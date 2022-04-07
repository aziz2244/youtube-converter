class Konversi {
  constructor(id) {
    this.idYt = id;
  }

  async getYt() {
    const response = await fetch(
      `https://ytmp3to.com/api/widget/all/${this.idYt}`
    );
    const responseData = await response.json();

    // iFrameResize({ log: false }, "#widgetIframe")
    return responseData;
  }

  setId(id) {
    this.idYt = id;
  }
}
