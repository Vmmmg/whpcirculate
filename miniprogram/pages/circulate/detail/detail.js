// pages/circulate/detail/detail.js
Page({
  getData: function (number) {
    const db = wx.cloud.database()
    db.collection("circulate").where({
      number: number
    }).get({
      success: res => {
        let dataList = res.data; 
        var posStr;
        var posSet=[];
        dataList.forEach((item) => {
          posSet[0] = item.position;
          posStr=item.position.split(",");
          posSet[1] = posStr[0].substring(0,6);
          posSet[2] = posStr[1].substring(0, 6);
          item.position = posSet;
        })
        // console.log(posSet);
        this.setData({
          items: res.data
        })
        console.log(this.data.items)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询失败'
        })
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    items: []
  },
  locate: function (e) {
    // console.log(e);
    var posStr = e.currentTarget.id;
    posStr = posStr.split(",");
    const latitude = parseFloat(posStr[1]);
    const longitude = parseFloat(posStr[0]);
    wx.openLocation({
      latitude,
      longitude
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      number: options.number
    })
    console.log(this.data.number)
    this.getData(options.number)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})