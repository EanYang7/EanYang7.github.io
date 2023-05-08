# COCO

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#home)

## 数据格式

### supercategory超类

supercategory是一种将80个物体类别分为12个更广泛的类别的方法，例如动物、车辆、食物等。

supercategory对于一些需要更高层次的抽象或泛化的任务有用，例如图像描述或语义分割。例如，图像描述可以简单地说“图片中有几种动物”，而不是列出每种具体的动物。

同样，语义分割模型可以将不同类型的车辆归为一个类别，而不是分配不同的标签。

supercategory还可以帮助减少数据集的复杂性和不平衡性，因为有些类别可能比其他类别有更多的实例或变化。

---

```
appliance（家电）
food（食物）
accessory（配件）
sports（运动）
indoor（室内）
animal（动物）
furniture（家具）
electronic（电子产品）
outdoor（户外）
person（人）
kitchen（厨房）
vehicle（车辆）
```

### 数据种类

<details>
  <summary>COCO数据种类(80种)</summary>
  <div>
    <details>
      <summary>supercategory超类(12类)</summary>
      <details>
        <summary>人person(1)</summary>
        <div>1. 人（person） - id: 1</div>
      </details>
      <details>
        <summary>车辆vehicle(8)</summary>
        <div>
          2. 自行车（bicycle） - id: 2 <br/>
          3. 汽车（car） - id: 3 <br/>
          4. 摩托车（motorcycle） - id: 4 <br/>
          5. 飞机（airplane） - id: 5 <br/>
          6. 公共汽车（bus） - id: 6 <br/>
          7. 火车（train） - id: 7 <br/>
          8. 卡车（truck） - id: 8 <br/>
          9. 船（boat） - id: 9
        </div>
      </details>
      <details>
        <summary>户外outdoor(5)</summary>
        <div>
          10. 交通灯（traffic light） - id: 10 <br/>
          11. 消防栓（fire hydrant） - id: 11 <br/>
          12. 停止标志（stop sign） - id: 13 <br/>
          13. 停车计时器（parking meter） - id: 14 <br/>
          14. 长椅（bench） - id: 15
        </div>
      </details>
      <details>
        <summary>动物animal(10)</summary>
        <div>
          15. 鸟（bird） - id: 16 <br/>
          16. 猫（cat） - id: 17 <br/>
          17. 狗（dog） - id: 18 <br/>
          18. 马（horse） - id: 19 <br/>
          19. 绵羊（sheep） - id: 20 <br/>
          20. 牛（cow） - id: 21 <br/>
          21. 大象（elephant） - id: 22 <br/>
          22. 熊（bear） - id: 23 <br/>
          23. 斑马（zebra） - id: 24 <br/>
          24. 长颈鹿（giraffe） - id: 25
        </div>
      </details>
      <details>
        <summary>饰品accessory(5)</summary>
        <div>
          25. 背包（backpack） - id: 27 <br/>
          26. 雨伞（umbrella） - id: 28 <br/>
          27. 手提包（handbag） - id: 31 <br/>
          28. 领带（tie） - id: 32 <br/>
          29. 手提箱（suitcase） - id: 33
        </div>
      </details>
      <details>
        <summary>运动sports(10)</summary>
        <div>
          30. 飞盘（frisbee） - id: 34 <br/>
          31. 滑雪板（skis） - id: 35 <br/>
          32. 滑雪板（snowboard） - id: 36 <br/>
          33. 运动球（sports ball） - id: 37 <br/>
          34. 风筝（kite） - id: 38 <br/>
          35. 棒球棒（baseball bat） - id: 39 <br/>
          36. 棒球手套（baseball glove） - id: 40 <br/>
          37. 滑板（skateboard） - id: 41 <br/>
          38. 冲浪板（surfboard） - id: 42 <br/>
          39. 网球拍（tennis racket） - id: 43
        </div>
      </details>
      <details>
        <summary>厨房kitchen(7)</summary>
        <div>
          40. 瓶子（bottle） - id: 44 <br/>
          41. 酒杯（wine glass） - id: 46 <br/>
          42. 杯子（cup） - id: 47 <br/>
          43. 叉子（fork） - id: 48 <br/>
          44. 刀（knife） - id: 49 <br/>
          45. 勺子（spoon） - id: 50 <br/>
          46. 碗（bowl） - id: 51
        </div>
      </details>
      <details>
        <summary>食物food(10)</summary>
        <div>
          47. 香蕉（banana） - id: 52 <br/>
          48. 苹果（apple） - id: 53 <br/>
          49. 三明治（sandwich） - id: 54 <br/>
          50. 橙子（orange） - id: 55 <br/>
          51. 西兰花（broccoli） - id: 56 <br/>
          52. 胡萝卜（carrot） - id: 57 <br/>
          53. 热狗（hot dog） - id: 58 <br/>
          54. 比萨（pizza） - id: 59 <br/>
          55. 甜甜圈（donut） - id: 60 <br/>
          56. 蛋糕（cake） - id: 61
        </div>
      </details>
      <details>
        <summary>家具furniture(6)</summary>
        <div>
          57. 椅子（chair） - id: 62 <br/>
          58. 沙发（couch） - id: 63 <br/>
          59. 盆栽植物（potted plant） - id: 64 <br/>
          60. 床（bed） - id: 65 <br/>
          61. 餐桌（dining table） - id: 67 <br/>
          62. 厕所（toilet） - id: 70
        </div>
      </details>
      <details>
        <summary>电子产品furniture(6)</summary>
        <div>
          63. 电视（tv） - id: 72 <br/>
          64. 笔记本电脑（laptop） - id: 73 <br/>
          65. 鼠标（mouse） - id: 74 <br/>
          66. 遥控器（remote） - id: 75 <br/>
          67. 键盘（keyboard） - id: 76 <br/>
          68. 手机（cell phone） - id: 77
        </div>
      </details>
      <details>
        <summary>家用电器appliance(5)</summary>
        <div>
          69. 微波炉（microwave） - id: 78 <br/>
          70. 烤箱（oven） - id: 79 <br/>
          71. 烤面包机（toaster） - id: 80 <br/>
          72. 水槽（sink） - id: 81 <br/>
          73. 冰箱（refrigerator） - id: 82
        </div>
      </details>
      <details>
        <summary>室内indoor(7)</summary>
        <div>
          74. 书（book） - id: 84 <br/>
          75. 时钟（clock） - id: 85 <br/>
          76. 花瓶（vase） - id: 86 <br/>
          77. 剪刀（scissors） - id: 87 <br/>
          78. 泰迪熊（teddy bear） - id: 88 <br/>
          79. 吹风机（hair dryer） - id: 89 <br/>
          80. 牙刷（toothbrush） - id: 90
        </div>
      </details>
    </details>
    </div>
  </details>



<details>
<summary>全部数据</summary>

| 序号 | supercategory  | name                    | id   |
| ---- | -------------- | ----------------------- | ---- |
| 1    | 人person        | 人（person）            | 1    |
| 2    | 车辆vehicle     | 自行车（bicycle）       | 2    |
| 3    | 车辆            | 汽车（car）             | 3    |
| 4    | 车辆            | 摩托车（motorcycle）    | 4    |
| 5    | 车辆            | 飞机（airplane）        | 5    |
| 6    | 车辆            | 公共汽车（bus）         | 6    |
| 7    | 车辆            | 火车（train）           | 7    |
| 8    | 车辆            | 卡车（truck）           | 8    |
| 9    | 车辆            | 船（boat）              | 9    |
| 10   | 户外outdoor     | 交通灯（traffic light） | 10   |
| 11   | 户外            | 消防栓（fire hydrant）  | 11   |
| 12   | 户外            | 停止标志（stop sign）   | 13   |
| 13   | 户外            | 停车计时器（parking meter） | 14   |
| 14   | 户外            | 长椅（bench）           | 15   |
| 15   | 动物animal      | 鸟（bird）              | 16   |
| 16   | 动物            | 猫（cat）               | 17   |
| 17   | 动物            | 狗（dog）               | 18   |
| 18   | 动物            | 马（horse）             | 19   |
| 19   | 动物            | 绵羊（sheep）           | 20   |
| 20   | 动物            | 牛（cow）               | 21   |
| 21   | 动物            | 大象（elephant）        | 22   |
| 22   | 动物            | 熊（bear）              | 23   |
| 23   | 动物            | 斑马（zebra）           | 24   |
| 24   | 动物            | 长颈鹿（giraffe）       | 25   |
| 25   | 饰品accessory   | 背包（backpack）        | 27   |
| 26   | 饰品            | 雨伞（umbrella）        | 28   |
| 27   | 饰品            | 手提包（handbag）       | 31   |
| 28   | 饰品            | 领带（tie）             | 32   |
| 29   | 饰品              | 手提箱（suitcase）       | 33   |
| 30   | 运动sports        | 飞盘（frisbee）          | 34   |
| 31   | 运动              | 滑雪板（skis）           | 35   |
| 32   | 运动              | 滑雪板（snowboard）      | 36   |
| 33   | 运动              | 运动球（sports ball）    | 37   |
| 34   | 运动              | 风筝（kite）             | 38   |
| 35   | 运动              | 棒球棒（baseball bat）   | 39   |
| 36   | 运动              | 棒球手套（baseball glove） | 40   |
| 37   | 运动              | 滑板（skateboard）       | 41   |
| 38   | 运动              | 冲浪板（surfboard）      | 42   |
| 39   | 运动              | 网球拍（tennis racket）  | 43   |
| 40   | 厨房kitchen       | 瓶子（bottle）           | 44   |
| 41   | 厨房              | 酒杯（wine glass）       | 46   |
| 42   | 厨房              | 杯子（cup）              | 47   |
| 43   | 厨房              | 叉子（fork）             | 48   |
| 44   | 厨房              | 刀（knife）              | 49   |
| 45   | 厨房              | 勺子（spoon）            | 50   |
| 46   | 厨房              | 碗（bowl）               | 51   |
| 47   | 食物food          | 香蕉（banana）           | 52   |
| 48   | 食物              | 苹果（apple）            | 53   |
| 49   | 食物              | 三明治（sandwich）       | 54   |
| 50   | 食物              | 橙子（orange）           | 55   |
| 51   | 食物              | 西兰花（broccoli）       | 56   |
| 52   | 食物              | 胡萝卜（carrot）         | 57   |
| 53   | 食物              | 热狗（hot dog）          | 58   |
| 54   | 食物              | 比萨（pizza）            | 59   |
| 55   | 食物              | 甜甜圈（donut）          | 60   |
| 56   | 食物              | 蛋糕（cake）             | 61   |
| 57   | 家具furniture     | 椅子（chair）           | 62   |
| 58   | 家具              | 沙发（couch）            | 63   |
| 59   | 家具              | 盆栽植物（potted plant） | 64   |
| 60   | 家具              | 床（bed）                | 65   |
| 61   | 家具              | 餐桌（dining table）     | 67   |
| 62   | 家具              | 厕所（toilet）           | 70   |
| 63   | 电子产品electronic | 电视（tv）               | 72   |
| 64   | 电子产品          | 笔记本电脑（laptop）     | 73   |
| 65   | 电子产品          | 鼠标（mouse）            | 74   |
| 66   | 电子产品          | 遥控器（remote）         | 75   |
| 67   | 电子产品          | 键盘（keyboard）         | 76   |
| 68   | 电子产品          | 手机（cell phone）       | 77   |
| 69   | 家用电器appliance | 微波炉（microwave）      | 78   |
| 70   | 家用电器          | 烤箱（oven）             | 79   |
| 71   | 家用电器          | 烤面包机（toaster）      | 80   |
| 72   | 家用电器          | 水槽（sink）             | 81   |
| 73   | 家用电器          | 冰箱（refrigerator）     | 82   |
| 74   | 室内indoor        | 书（book）               | 84   |
| 75   | 室内              | 时钟（clock）            | 85   |
| 76   | 室内              | 花瓶（vase）             | 86   |
| 77   | 室内              | 剪刀（scissors）         | 87   |
| 78   | 室内              | 泰迪熊（teddy bear）     | 88   |
| 79   | 室内              | 吹风机（hair dryer）     | 89   |
| 80   | 室内              | 牙刷（toothbrush）       | 90   |

</details>



## 疑问

### 为什么80个类别但是id却到了90

COCO数据集中的80个物体类别有id从1到90，但其中有10个id没有，所以是80类。这是因为COCO数据集是从原来的91个类别中筛选出来的，但是为了保持原来的id不变，所以有些id被跳过了。这样做的好处是可以方便地和之前的版本兼容，也可以避免混淆不同的类别

## pycocotools

[cocodataset/cocoapi: COCO API - Dataset @ http://cocodataset.org/ (github.com)](https://github.com/cocodataset/cocoapi)

访问Microsoft COCO数据集的接口。

以下API函数已定义：

`COCO` - 加载COCO注释文件并准备数据结构的COCO API类。

`decodeMask` - 解码使用**行程长度编码run-length encoding**的二进制掩码M。

`encodeMask` - 使用行程长度编码将二进制掩码M编码。

`getAnnIds` - 获取满足给定过滤条件的注释id。

`getCatIds` - 获取满足给定过滤条件的类别id。

`getImgIds` - 获取满足给定过滤条件的图像id。

`loadAnns` - 使用指定的id加载注释。

`loadCats` - 使用指定的id加载类别。

`loadImgs` - 使用指定的id加载图像。

`annToMask` - 将注释中的分割转换为二进制掩码。

`showAnns` - 显示指定的注释。

`loadRes` - 加载算法结果并创建用于访问它们的API。

`download` - 从mscoco.org服务器下载COCO图像。

在整个API中，"ann"表示注释，"cat"表示类别，"img"表示图像。

### pycocoDemo.py

#### 绘制mask

<iframe src="/html/pycocoDemo_drawMask.html" width="800" height="600"></iframe>

---

#### 评估分割和检测结果

<iframe src="/html/pycocoEvalDemo_segm_bbox.html" width="800" height="600"></iframe>

## panopticapi

[panopticapi/evaluation.py at master · cocodataset/panopticapi · GitHub](https://github.com/cocodataset/panopticapi)