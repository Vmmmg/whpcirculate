// pages/circulate/search/search.js
Page({
  turn: function(e){
    wx.navigateTo({
      url: '/pages/circulate/detail/detail?number=' + this.data.number,
    })
  },

  input: function(e){
    this.setData({
      number: e.detail.value
    })
  },

  scanCode: function(e){
    wx.scanCode({
      success(res) {
        var json = JSON.parse(res.result);
        var number = json.number;
        console.log(number);
        wx.showToast({
          title: '扫描成功，正在跳转...',
          icon: 'success',
          duration: 2000
        });
        wx.navigateTo({
          url: '/pages/circulate/detail/detail?number=' + number,
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    number: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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