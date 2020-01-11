// pages/circulate/report/report.js
var utils = require("../../utils/utils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: ['生产', '储存', '运输', '经营', '使用', '废弃'],
    statusSelected: 0,
    form: ['气态', '液态', '固态'],
    formSelected: 0,
    enterprise: [],
    enterpriseSelected: 0,
    position: {
      longitude: '',
      latitude: ''
    },
    number: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getEnterpriseList();
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

  getEnterpriseList: function () {
    var that = this;
    const db = wx.cloud.database()
    db.collection('enterprise').get({
      success: function (res) {
        that.setData({
          enterprise: res.data
        })
      }
    })
  },

  statusChange: function (e) {
    this.setData({
      statusSelected: e.detail.value
    })
  },

  formChange: function (e) {
    this.setData({
      formSelected: e.detail.value
    })
  },

  enterpriseChange: function (e) {
    this.setData({
      enterpriseSelected: e.detail.value
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

  scanCode: function (e) {
    var that = this;
    const db = wx.cloud.database();
    wx.scanCode({
      success: (res) => {
        var number = res.result;
        wx.showToast({
          title: '扫描成功',
          icon: 'success',
          duration: 2000
        })
        console.log(number);
        db.collection("circulate").where({
          number: number,
          state: '生产'
        }).get({
          success: res => {
            var data = res.data[0];
            var formSelected = 0;
            for (var i = 0; i < that.data.form.length; i++) {
              if (that.data.form[i] == data.form) {
                formSelected = i;
              }
            }
            that.setData({
              number: data.number,
              name: data.name,
              formSelected: formSelected 
            })
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询失败'
            })
          }
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫描失败',
          duration: 2000
        })
      },
      complete: (res) => {
      }
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
          console.log("success");
          var result = '';
          console.log(circularData.state);
          if(circularData.state  == "生产"){
              result = circularData.number;
          }
          else{
            result = 'success';
          }
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          wx.navigateTo({url: '/pages/circulate/result/result?result=' + result,})
        },
        fail: err => {
          var result = 'fail'
          wx.navigateTo({ url: '/pages/circulate/result/result?result=' + result, })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }
  }
})