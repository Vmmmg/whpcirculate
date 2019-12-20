// pages/circulate/report/report.js
var utils = require("../../utils/utils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: ['生产', '储存', '运输', '经营', '使用', '废弃'],
    statusSelected: 0,
    position: {
      longitude: '',
      latitude: ''
    },
    form_info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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

  },

  statusChange: function (e) {
    this.setData({
      statusSelected: e.detail.value
    })
  },

  locate: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          position: {
            longitude: res.longitude,
            latitude: res.latitude
          },
        })
      },
    })
  },

  circulateSubmit: function (e) {
    var circularData = e.detail.value
    circularData.position = circularData.position.replace(/\s+/g, '')
    if (circularData.bn == "") {
      wx.showToast({
        title: '未填写产品批号',
        icon: 'none'
      })
    }
    if (circularData.name == "") {
      wx.showToast({
        title: '未填写化学品名',
        icon: 'none'
      })
    }
    if (circularData.weight == "") {
      wx.showToast({
        title: '未填写重量',
        icon: 'none'
      })
    }
    else if (circularData.enterprise == "") {
      wx.showToast({
        title: '未填写企业名称',
        icon: 'none'
      })
    }
    else if (circularData.position == "" || circularData.position == ",") {
      wx.showToast({
        title: '未填写位置信息',
        icon: 'none'
      })
    }
    else {
      var time = utils.formatTime(new Date());
      circularData.time = time;
      const db = wx.cloud.database()
      var that = this
      db.collection('circulate').add({
        data: circularData,
        success: res => {
          wx.showToast({
            title: '上传成功',
          })
          that.setData({
            statusSelected: 0,
            position: {
              longitude: '',
              latitude: ''
            },
            form_info: ''
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '上传失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }
  }
})