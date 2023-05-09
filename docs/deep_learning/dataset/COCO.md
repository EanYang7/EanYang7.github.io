# COCO

官网：[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#home)

论文：[论文地址](https://arxiv.org/abs/1405.0312)

github:[cocodataset/cocoapi: COCO API - Dataset @ http://cocodataset.org/ (github.com)](https://github.com/cocodataset/cocoapi)

- [x] [COCO数据集介绍以及pycocotools简单使用_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1TK4y1o78H?spm_id_from=333.337.search-card.all.click&vd_source=2fd7a12ad944b39c2263c1c7342c4723)

- [ ] [COCO Dataset Format - Complete Walkthrough - YouTube](https://www.youtube.com/watch?v=h6s61a_pqfM)

- [ ] [目标检测mAP计算以及coco评价标准_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1ez4y1X7g2?spm_id_from=333.337.search-card.all.click&vd_source=2fd7a12ad944b39c2263c1c7342c4723)

- [ ] [MS COCO数据集介绍以及pycocotools简单使用_太阳花的小绿豆的博客-CSDN博客_pycocotools 自己的数据集](https://blog.csdn.net/qq_37541097/article/details/113247318)

- [ ] [通过pycocotools获取每个类别的COCO指标_太阳花的小绿豆的博客-CSDN博客](https://blog.csdn.net/qq_37541097/article/details/112248194)

- [ ] [COCO数据集格式、mask两种存储格式、官方包API详解_遇到坎就得迈过去的博客-CSDN博客_coco数据集格式](https://blog.csdn.net/qq_43705697/article/details/122339511)

## 数据格式

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#format-data)

COCO有几种注释类型：用于[目标检测](https://cocodataset.org/#detection-2020)、[关键点检测](https://cocodataset.org/#keypoints-2020)、[stuff分割](https://cocodataset.org/#stuff-2019)、[全景分割](https://cocodataset.org/#panoptic-2020)、[densepose](https://cocodataset.org/#densepose-2020)和[图像captioning](https://cocodataset.org/#captions-2015)。注释使用JSON存储。请注意，下载页面上描述的COCO API可用于访问和操作所有Anotation。

所有注释共享以下相同的基本数据结构：

```json
{
    "info": info,
    "images": [image], 
    "annotations": [annotation],
    "licenses": [license],
}

info{
    "year": int, 
    "version": str, 
    "description": str, 
    "contributor": str, 
    "url": str, 
    "date_created": datetime,
}

image{
    "id": int, 
    "width": int, 
    "height": int, 
    "file_name": str, 
    "license": int, 
    "flickr_url": str, 
    "coco_url": str, 
    "date_captured": datetime,
}

license{
    "id": int, 
    "name": str, 
    "url": str,
}
```

:::tip

+ 其中info、licenses、images都不重要，重点关注annotations和categories
+ vscode可能打不开太大的JSON文件，可以把该文件`另存为`试一试，在Shift+Alt+F重新组织格式
+ 可以通过vscode自带的大纲outline查看具体结构，同时配合json插件看看数量（数量太多的项就不要打开了，可能会卡住，看看数字就行了） 

:::

### 各种任务注释类型的数据结构

#### Object Detection

每个对象实例注释包含一系列字段，包括对象的类别id和分割掩码segmentation mask。分割格式取决于实例是表示单个对象（iscrowd=0，在这种情况下使用多边形polygons）还是表示对象的集合（iscrowd=1，在这种情形下使用RLE）。请注意，单个对象（iscrowd=0）可能需要多个多边形，例如如果被遮挡。群体注释（iscrowd=1）用于标记大量对象（例如一群人）。此外，为每个对象提供了一个封闭边界框（框坐标从图像左上角测量，并为0索引）。最后，注释结构的categories字段存储了类别ID到类别和超类别名称的映射。另请参见[检测](https://cocodataset.org/#detection-2020)任务。

```json
annotation{
    "id": int, 
    "image_id": int, 
    "category_id": int, 
    "segmentation": RLE or [polygon], 
    "area": float, 
    "bbox": [x,y,width,height], 
    "iscrowd": 0 or 1,
}
    
categories[{
    "id": int, 
    "name": str, 
    "supercategory": str,
}]
```

##### annotation字段

```json
   "annotations": [
        {
            "segmentation": [
                [
                    32.72,
                    141.86,
                    156.04,
                    148.57,
                    161.91,
                    372.56,
                    150.17,
                    375,
                    55.37,
                    374.24,
                    38.37,
                    364.1,
                    20.07,
                    145.78
                ]
            ],
            "area": 29586.69185,
            "iscrowd": 0,
            "image_id": 453302,
            "bbox": [
                20.07,
                141.86,
                141.84,
                233.14
            ],
            "category_id": 82,
            "id": 332751
        }
    ],
```

##### categories字段

```json
    "categories": [
        {
            "supercategory": "person",
            "id": 1,
            "name": "person"
        },
        {
            "supercategory": "vehicle",
            "id": 2,
            "name": "bicycle"
        },
        {
            "supercategory": "vehicle",
            "id": 3,
            "name": "car"
        },
        
        。。。
        
                {
            "supercategory": "indoor",
            "id": 88,
            "name": "teddy bear"
        },
        {
            "supercategory": "indoor",
            "id": 89,
            "name": "hair drier"
        },
        {
            "supercategory": "indoor",
            "id": 90,
            "name": "toothbrush"
        }
    ]
```



#### Stuff分割

stuff注释格式与上面的对象检测格式完全相同并完全兼容（除了iscrowd是不必要的，并且默认设置为0）。我们提供JSON和png格式的注释，以便于访问，并提供两种格式之间的[转换脚本](https://github.com/nightrome/coco)。在JSON格式中，图像中的每个类别都使用单个RLE注释进行编码（有关更多详细信息，请参阅Mask API）。category_id表示当前stuff类别的id。有关stuff类别和超类别supercategories的更多详细信息，请参阅[stuff评估](https://cocodataset.org/#stuff-eval)页面。也可以查阅[stuff](https://cocodataset.org/#stuff-2019)任务。

#### 全景分割

对于[全景任务](https://cocodataset.org/#panoptic-2020)，<font color='red'>每个注释结构都是每一图像注释，而不是每个对象注释(实例分割)</font>。每个每幅图像注释有两个部分：（1）一个PNG，用于存储类无关的图像分割；（2）一个JSON结构，用于存储每个图像段的语义信息。更详细地说：

1. 要将注释与图像匹配，请使用`image_id` 字段（即`annotation.image_id==image.id`）。

2. 对于每个注释，每像素的segment id作为单个PNG存储在 `annotation.file_name`。PNG位于一个与JSON同名的文件夹中，即`annotations/name.json`的`annotations/name/`。每个segment（无论是stuff 还是 thing segment）都分配了一个唯一的id。未标记像素（void）的值为0。请注意，当您将PNG加载为RGB图像时，您需要通过`id=R+G*256+B*256^2`计算ids。

3. 对于每个注释，每个segment信息存储在`annotation.segments_info`中。`segment_info.id`存储segment 的唯一id，并用于从PNG检索相应掩码(`ids==segment_info.id`)。`category_id`表示语义类别，`iscrowd`表示segment 包含一组对象（仅与thing 类别相关）。bbox和area字段提供有关该segment的其他信息。

4. COCO全景任务与检测任务具有相同的thing 类别，而stuff 类别与stuff 任务中的不同（有关详细信息，请参阅[全景评估](https://cocodataset.org/#panoptic-eval)页面）。最后，每个类别结构都有两个附加字段：区分stuff 和thing类别的isthing和有助于一致可视化的颜色。      

```json
annotation{
    "image_id": int, 
    "file_name": str, 
    "segments_info": [segment_info],
    }

segment_info{
    "id": int,. 
    "category_id": int, 
    "area": int, 
    "bbox": [x,y,width,height], 
    "iscrowd": 0 or 1,
}

categories[{
    "id": int, 
    "name": str, 
    "supercategory": str, 
    "isthing": 0 or 1, 
    "color": [R,G,B],
}]
```

##### annotations字段

```json
 "annotations": [
        {
            "segments_info": [
                {
                    "id": 5931152,
                    "category_id": 23,
                    "iscrowd": 0,
                    "bbox": [
                        1,
                        69,
                        585,
                        564
                    ],
                    "area": 275827
                },
                {
                    "id": 3834981,
                    "category_id": 193,
                    "iscrowd": 0,
                    "bbox": [
                        0,
                        0,
                        586,
                        421
                    ],
                    "area": 88715
                }
            ],
            "file_name": "000000000285.png",
            "image_id": 285
        },
     。。。
 ],
```

##### categories字段

```json
"categories": [
        {
            "supercategory": "person",
            "isthing": 1,
            "id": 1,
            "name": "person"
        },
        {
            "supercategory": "vehicle",
            "isthing": 1,
            "id": 2,
            "name": "bicycle"
        },
        {
            "supercategory": "vehicle",
            "isthing": 1,
            "id": 3,
            "name": "car"
        },
    。。。
            {
            "supercategory": "solid",
            "isthing": 0,
            "id": 198,
            "name": "rock-merged"
        },
        {
            "supercategory": "wall",
            "isthing": 0,
            "id": 199,
            "name": "wall-other-merged"
        },
        {
            "supercategory": "textile",
            "isthing": 0,
            "id": 200,
            "name": "rug-merged"
        }
    ]
}
```



## API

### COCO API

[cocodataset/cocoapi: COCO API - Dataset @ http://cocodataset.org/ (github.com)](https://github.com/cocodataset/cocoapi)

COCO API帮助加载、解析和可视化COCO中的注释。API支持多种注释格式（请参阅[数据格式](https://cocodataset.org/#format-data)页面）。有关更多详细信息，请参阅：[coco.py](https://github.com/cocodataset/cocoapi/blob/master/PythonAPI/pycocotools/coco.py)，以及[Python API Demo](https://github.com/cocodataset/cocoapi/blob/master/PythonAPI/pycocoDemo.ipynb)。

### MASK API

COCO为每个对象实例提供分割掩码。这带来了两个挑战：紧凑地存储掩码和高效地执行掩码计算。我们使用自定义运行周期编码（Run Length Encoding,RLE）方案解决了这两个挑战。RLE表示的大小与掩码的边界像素数成比例，可以直接在RLE上高效地计算面积、并集或交集等操作。具体来说，假设形状相当简单，RLE表示为O(√n） 其中，n是对象中的像素数，常用计算也为O(√n） 。在解码掩码（存储为数组）上简单计算相同的操作O(n)。

MASK API提供了一个用于操作以RLE格式存储的掩码的接口。API定义如下，有关更多详细信息，请参阅：[mask.py](https://github.com/cocodataset/cocoapi/blob/master/PythonAPI/pycocotools/mask.py)。最后，我们注意到，大多数ground truth masks 存储为多边形（非常紧凑），这些多边形在需要时转换为RLE。

| encode | Encode binary masks using RLE.                 |
| ------ | ---------------------------------------------- |
| decode | Decode binary masks encoded via RLE.           |
| merge  | Compute union or intersection of encoded masks |
| iou    | Compute intersection over union between masks  |
| area   | Compute area of encoded masks.                 |
| toBbox | Get bounding boxes surrounding encoded masks   |
| frBbox | Convert bounding boxes to encoded masks        |
| frPoly | Convert polygon to encoded mask.               |

# 什么是COCO

COCO是一个大规模的对象检测、分割和描述(captioning)数据集。COCO有几个特点：

+ 对象分割，目标级分割
+ 语境中的认知
+ 超像素**stuff**分割
+ 33万张图片（标签大于20万个）
+ 150万个对象实例
+ 80个对象类别
+ 91种stuff类别
+ 每幅图像有5个描述captions
+ 对25万个人进行了关键点标注

> 注意区分**对象类别**和**材料stuff类别**
>
> 对象类别：有明确形状的物体，比如人，汽车
>
> stuff类别：没有形状的背景区域，比如草，天空

## 查看数据集jsonwenjain

使用python的json模块

````python
import json

json_data = open('instances_train2017.json')
data = json.load(json_data)
print(data)
````

在print前面设置断点，使用debug模式查看data变量 

训练集118287张图片，860001个注释

验证集5000张图片，36781个注释

> 注意里面的category_id索引范围不是80而是91

## 数据集

### 探索

[explore](https://cocodataset.org/#explore)

使用在线界面浏览数据集。了解COCO中数据的规模和类型。

### 下载

[download](https://cocodataset.org/#download)

下载数据集，包括工具、图像和注释。请参见Matlab或Python代码中的[cocoDemo](https://github.com/cocodataset/cocoapi/blob/master/PythonAPI/pycocoDemo.ipynb)。

常用的数据集是2017年的

#### 图片

[2017 Train images [118K/18GB\]](http://images.cocodataset.org/zips/train2017.zip)
[2017 Val images [5K/1GB\]](http://images.cocodataset.org/zips/val2017.zip)
[2017 Test images [41K/6GB\]](http://images.cocodataset.org/zips/test2017.zip)
[2017 Unlabeled images [123K/19GB\]](http://images.cocodataset.org/zips/unlabeled2017.zip)

#### 标注

[2017 Train/Val annotations [241MB\]](http://images.cocodataset.org/annotations/annotations_trainval2017.zip)
[2017 Stuff Train/Val annotations [1.1GB\]](http://images.cocodataset.org/annotations/stuff_annotations_trainval2017.zip)
[2017 Panoptic Train/Val annotations [821MB\]](http://images.cocodataset.org/annotations/panoptic_annotations_trainval2017.zip)
[2017 Testing Image info [1MB\]](http://images.cocodataset.org/annotations/image_info_test2017.zip)
[2017 Unlabeled Image info [4MB\]](http://images.cocodataset.org/annotations/image_info_unlabeled2017.zip)

---

为了高效下载图像，建议使用gsutil rsync来避免下载大型zip文件。请按照COCO API自述文件中的说明设置下载的COCO数据（图像和注释应位于COCO/images/和COCO/annotations/中）。

>数据托管在谷歌云平台（GCP）上。gsutil提供了有效访问这些数据的工具。使用gsutil不需要GCP帐户。下载数据的说明如下：
>
>(1) Install gsutil via:`curl https://sdk.cloud.google.com` 
>
>(2) Make local dir:`mkdir val2017`
>
>(3) Synchronize via:`gsutil -m rsync gs://images.cocodataset.org/val2017 val2017`
>
>通过rsync下载的可以拆分为：train2014、val2014、test2014、test2015、train2017、val2017、test2017、unlabelled2017。只需将“val2017”替换为您希望下载的那部分，然后重复步骤（2）-（3）。最后，您还可以通过以下方式下载所有注释zip文件：
>
>(4) Get annotations:`gsutil -m rsync gs://images.cocodataset.org/annotations [localdir]`
>
>下载是多线程的，您还可以控制下载的其他选项（请参阅[gsutil rsync](https://cloud.google.com/storage/docs/gsutil/commands/rsync)）。

### 外部注释

[external](https://cocodataset.org/#external)

下载补充或扩展COCO的外部数据集，包括对象属性、VQA、人类行为和与对象的交互、场景文本、显著性等的COCO注释。

注：以下数据集可能使用COCO数据，但这些数据集是独立的，与COCO没有直接联系。

#### COCO和相关数据集的外部注释

##### COCO-Stuff

github:[nightrome/cocostuff: The official homepage of the COCO-Stuff dataset. (github.com)](https://github.com/nightrome/cocostuff)

论文：https://arxiv.org/abs/1612.03716

COCO Stuff使用像素级的Stuff注释为10000张图像扩展了COCO数据集。91个stuff类经过精心挑选，其粒度级别与COCO中的thing类相似，允许在上下文中研究stuff和thing。

##### COCO-Crowd

[COCO-Crowd Dataset (google.com)](https://sites.google.com/view/coco-crowd/home)

下载：[Dropbox - coco_crowd](https://www.dropbox.com/sh/0zvxrkgpufsa2ar/AADuyx56J8giq73sYg2FeM5_a?dl=0)

##### PASCAL VOC

官网：[PASCAL VOC](http://host.robots.ox.ac.uk:8080/pascal/VOC/)

COCO格式的PASCAL VOC 2007和2012注释。这允许将PASCAL 检测数据与COCO API（包括可视化和评估工具）结合使用。[此处](https://s3.amazonaws.com/images.cocodataset.org/external/external_PASCAL_VOC.zip)提供JSON。

##### ImageNet 检测

COCO格式的ImageNet 2014 train/val注释。这允许使用带有COCO API的ImageNet检测数据（包括可视化和评估工具）。[此处](https://s3.amazonaws.com/images.cocodataset.org/external/external_ILSVRC2014.zip)提供JSON。

# 任务

## Detection 2020

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#detection-2020)

### COCO 2020目标检测任务

COCO目标检测任务旨在推动目标检测技术的发展。COCO具有两个对象检测任务：使用边界框输出或对象分割输出（后者也称为实例分割）。有关此任务的完整详细信息，请参阅[检测评估](https://cocodataset.org/#detection-eval)页面。

虽然检测任务处理*thing* 类（人、车、大象），但[stuff](https://cocodataset.org/#stuff-2019)任务关注*stuff* 类（草、墙、天空），新引入的全景[panoptic](https://cocodataset.org/#panoptic-2020)任务同时处理这两个对象。

COCO训练、验证和测试集包含200000多个图像和80个对象类别，可在[下载](https://cocodataset.org/#download)页面上找到。所有对象实例都使用详细的分割掩码segmentation mask进行注释。训练集和验证集上的注释（分割了500000多个对象实例）是公开的。

对于具有边界框输出的检测，研究人员可以继续在[评估服务器](https://codalab.lisn.upsaclay.fr/)上提交测试test-dev 和val

> #### CodaLab竞赛
>
> 网站：[CodaLab - Home (upsaclay.fr)](https://codalab.lisn.upsaclay.fr/)
>
> 原网站：[CodaLab - Home](https://competitions.codalab.org/)
>
> github:[codalab/codalab-competitions: CodaLab Competitions (github.com)](https://github.com/codalab/codalab-competitions)
>
> 

COCO测试集分为两部分： test-dev 和test-challenge。test-dev是在一般情况下进行测试的默认测试集，用于维护公共[排行榜](https://cocodataset.org/#detection-leaderboard)。Test-dev用于研讨会竞赛；结果将在研讨会上公布。当参与此任务时，请在将结果上载到评估服务器时，在“方法描述”中指定用于训练的任何和所有外部数据。有关所有这些详细信息的详细说明，请参见[指南](https://cocodataset.org/#guidelines)页面，请务必在参与之前仔细阅读。必须将正确[格式](https://cocodataset.org/#format-results)的结果[上传](https://cocodataset.org/#upload)到[评估服务器](https://competitions.codalab.org/competitions/20796)。[评估](https://cocodataset.org/#detection-eval)页面列出了有关如何评估结果的详细信息。

## Panoptic 2020

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#panoptic-2020)

COCO panoptic segmentation dataset这个数据集包含11.8万张用于训练的图片，5千张用于验证的图片，80个类别的thing和53个类别的stuff的注释

### COCO 2020全景分割任务 

![img](E:\Typora_Picture\COCO.assets\panoptic-splash.png)

COCO全景分割任务旨在推动场景分割技术的发展。全景分割同时处理 stuff 和thing类，统一了典型的不同语义和实例分割任务。其目的是生成丰富且完整的连贯场景分割，这是走向真实世界视觉系统（如自主驾驶或增强现实）的重要一步。有关全景分割任务的完整详细信息，请参阅[全景评估](https://cocodataset.org/#panoptic-eval)页面。

更详细地说：things是可数的物体，如人、动物、工具。Stuff类是具有类似纹理或材质的无定形区域，例如草地、天空、道路。以前的COCO任务<font color='red'>分别处理</font>了stuff和thing类，请分别参阅[实例分割](https://cocodataset.org/#detection-2018)和[stuff分割](https://cocodataset.org/#stuff-2018)任务。为了鼓励在一个<font color='red'>统一的框架</font>中研究stuff 和things，我们引入了COCO全景分割任务。“全景”的定义是“包括一个视图中可见的一切”，在我们的上下文中，全景是指一个统一的全局分割视图。全景分割任务涉及<font color='red'>为图像的每个像素分配语义标签和实例id</font>，这需要生成密集、连贯的场景分割。此任务的stuff注释来自[论文](https://arxiv.org/abs/1612.03716)中描述的[COCO stuff项目](https://github.com/nightrome/cocostuff)。有关全景任务的更多详细信息，包括评估指标，请参阅[全景分割论文](https://arxiv.org/abs/1801.00868)。

<font color='red'>全景任务使用所有带注释的COCO图像，包括[检测](https://cocodataset.org/#detection-2020)任务中的80个事物类别和stuff任务中91个[stuff](https://cocodataset.org/#stuff-2019)类别的子集，并手动解决任何重叠。全景质量（PQ）指标用于性能评估</font >，有关详细信息，请参阅[全景评估](https://cocodataset.org/#panoptic-eval)页面。

>要下载COCO Panoptic API，请访问我们的[GitHub存储库](https://github.com/cocodataset/panopticapi)。请注意，主要的COCO API目前不适用于全景注释。

## Stuff 2019 

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#stuff-2019)

### COCO 2019 Stuff 分割任务

![img](E:\Typora_Picture\COCO.assets\stuff-splash.png)

COCO Stuff Segmentation任务旨在推动Stuff类语义分割的最新技术。虽然[目标检测](https://cocodataset.org/#detection-2019)任务处理*thing* 类（人、车、大象），但该任务侧重于*stuff* 类（草、墙、天空）。有关stuff segmentation任务的完整详细信息，请参阅[stuff evaluation](https://cocodataset.org/#stuff-eval)页面。注：新引入的[全景分割](https://cocodataset.org/#panoptic-2019)任务同时解决了things 和stuff 类的识别问题。

Things 是具有特定大小和形状的物体，通常由部件组成。Stuff 类是由精细比例特性fine-scale properties的同种类的或重复图案定义的背景材料，但没有特定或独特的空间范围或形状。为什么把重点放在东西上？COCO中的Stuff 覆盖了大约66%的像素。它允许我们解释图像的重要方面，包括场景类型；哪些事物类可能存在及其位置；以及场景的几何特性。COCO Stuff分割任务基于[本网站](https://github.com/nightrome/cocostuff)和[本研究论文](https://arxiv.org/abs/1612.03716)中描述的COCO Stuff项目。此任务包括并扩展了原始数据集版本。请注意，为了缩放注释，在图像的超像素分割上收集了stuff 分割。

要下载COCO Stuff API，请访问我们的[GitHub存储库](https://github.com/nightrome/coco)。有关如何使用API的概述，请访问[下载](https://cocodataset.org/#download)和[stuff评估](https://cocodataset.org/#stuff-eval)页面。请注意，此代码目前不是COCO API主存储库的一部分。

# 评估



## 结果格式

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#format-results)

## 测试指南

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#guidelines)

## 上传结果

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#upload)

## 评价指标

### Detection Evaluation

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#detection-eval)

### Stuff Evaluation

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#stuff-eval)

### Panoptic Evaluation

[COCO - Common Objects in Context (cocodataset.org)](https://cocodataset.org/#panoptic-eval)

#### 1. Panoptic Evaluation

COCO使用的全景评估指标。

评估代码可用于获得公开可用COCO验证集的结果。它计算多个指标，如下所述。为了获得隐藏了ground-truth注释的COCO测试集的结果，必须将生成的结果上传到评估服务器。下面描述的完全相同的评估代码用于评估测试集上的结果。

## 排行榜

[Detection](https://cocodataset.org/#detection-leaderboard) | [Keypoints](https://cocodataset.org/#keypoints-leaderboard) | [Stuff](https://cocodataset.org/#stuff-leaderboard) | [Panoptic](https://cocodataset.org/#panoptic-leaderboard) | [Captions](https://cocodataset.org/#captions-leaderboard)

> 这个排行榜有点过时了，推荐查看[Object Detection | Papers With Code](https://paperswithcode.com/task/object-detection#datasets)

# Stuff

<font color='red'>COCO论文中对stuff的说明</font>

>The selection of object categories is a non-trivial exercise.The categories must form a representative set of all categories, be relevant to practical applications and occur with high enough frequency to enable the collection of
>a large dataset. Other important decisions are whether to include both “thing” and “stuff” categories and whether fine-grained, and object-part categories should be included. “Thing” categories include objects for which individual instances may be easily labeled (person, chair, car) where “stuff” categories include materials and objects with no clear boundaries (sky,street, grass). Since we are primarily interested in precise localization of object instances, we decided to only include “thing” categories and not “stuff.” However,since “stuff” categories can provide significant contextual information, we believe the future labeling of “stuff” categories would be beneficial.

对象类别的选择是一项非常重要的工作。类别必须形成所有类别的代表集，与实际应用相关，并以足够高的频率出现，以便能够收集大型数据集。其他重要的决定是是否同时包括“thing”和“stuff”类别，以及是否应包括细粒度和对象部分类别。“物”类别包括单个实例可以很容易标记的对象（人、椅子、汽车），其中“材料”类别包括没有明确边界的材料和对象（天空、街道、草地）。因为我们主要对对象实例的精确定位感兴趣，所以我们决定只包括“事物”类别，而不包括“东西”然而，由于“材料”类别可以提供重要的上下文信息，我们相信未来对“材料”类别的标记将是有益的。

> We currently only label “things”, but labeling “stuff” may also provide significant contextual information that may be useful for detection.

我们目前只给“things”贴标签，但给“stuff”贴标签也可以提供重要的上下文信息，可能对检测有用。

## 介绍

论文：[COCO-Stuff: Thing and Stuff Classes in Context (thecvf.com)](https://openaccess.thecvf.com/content_cvpr_2018/papers/Caesar_COCO-Stuff_Thing_and_CVPR_2018_paper.pdf)

github:[nightrome/cocostuff: The official homepage of the COCO-Stuff dataset. (github.com)](https://github.com/nightrome/cocostuff)

[人工智能 | 全景分割以及语义分割的难题及进展_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1tt411Q72S?p=1&vd_source=2fd7a12ad944b39c2263c1c7342c4723)

[全景分割任务介绍及其最新进展【附PPT与视频资料】 (qq.com)](https://mp.weixin.qq.com/s/ygWCfLnakHIwLVk7hRAKNg)

## 数据格式

### 共有的数据结构

所有任务注释共享相同的基本数据结构

```json
{
"info": info, "images": [image], "annotations": [annotation], "licenses": [license],
}

info{
"year": int, "version": str, "description": str, "contributor": str, "url": str, "date_created": datetime,
}

image{
"id": int, "width": int, "height": int, "file_name": str, "license": int, "flickr_url": str, "coco_url": str, "date_captured": datetime,
}

license{
"id": int, "name": str, "url": str,
}
```

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

## 工具

### 可视化FiftyOne

官网：https://fiftyone.ai/

github：[voxel51/fiftyone: The open-source tool for building high-quality datasets and computer vision models (github.com)](https://github.com/voxel51/fiftyone)

官网推荐使用开源工具FiftyOne，有助于可视化和访问COCO数据资源，是COCO模型分析的评估工具。

COCO现在可以从FiftyOne数据集 [Zoo](https://voxel51.com/docs/fiftyone/user_guide/dataset_zoo/index.html)下载：

```
dataset = fiftyone.zoo.load_zoo_dataset("coco-2017")
```

FiftyOne还提供了一些方法，允许您下载和可视化数据集的特定子集，其中只包含您在几行代码中关心的标签和类。

```
dataset = fiftyone.zoo.load_zoo_dataset(
    "coco-2017",
    split="validation",
    label_types=["detections", "segmentations"],
    classes=["person", "car"],
    max_samples=50,
)

# Visualize the dataset in the FiftyOne App
session = fiftyone.launch_app(dataset)
```

一旦你开始在COCO上训练模型，你可以使用[FiftyOne的COCO风格评估](https://voxel51.com/docs/fiftyone/integrations/coco.html)来了解你的模型性能，并进行详细的分析， [可视化单独的 false positives](https://voxel51.com/docs/fiftyone/user_guide/using_views.html#evaluation-patches)，[绘制PR曲线](https://voxel51.com/docs/fiftyone/user_guide/evaluation.html#map-and-pr-curves)，并[与混淆矩阵进行交互](https://voxel51.com/docs/fiftyone/user_guide/plots.html#confusion-matrices)。

有关更多详细信息，请参阅FiftyOne和COCO[集成文档](https://voxel51.com/docs/fiftyone/integrations/coco.html)。