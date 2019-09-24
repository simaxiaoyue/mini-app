// components/ChangeBar/index.js
Component({
  properties: {
    titleList: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },

  methods: {
    getIndex(e) {
      // console.log(e);
      const { index } = e.target.dataset;
      this.setData({
        currentIndex: index
      })
    }
  }
})
