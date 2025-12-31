# Cluster Analysis

## Tips

- [Cluster analysis](https://en.wikipedia.org/wiki/Cluster_analysis)

## 定义

- 链接模型 - Connectivity models
  - 分级聚类
- 中心模型 - Centroid models
  - K-Mearns
- 分布模型 - Distribution models
  - DBSCAN
  - OPTICS
- 密度模型 - Density models
- 子空间模型 - Subspace models
- 分组模型 - Group models
- 基于图的模型 - Graph-based models
- 神经模型 - Neural models

可粗略分为

- Hard clustering - 每个对象属于或不属于一个对象
- Soft clustering / Fuzzy clustering - 每个对象都一定程度属于每个类

Strict partitioning clustering: each object belongs to exactly one cluster
Strict partitioning clustering with outliers: objects can also belong to no cluster, and are considered outliers
Overlapping clustering (also: alternative clustering, multi-view clustering): objects may belong to more than one cluster; usually involving hard clusters
Hierarchical clustering: objects that belong to a child cluster also belong to the parent cluster
Subspace clustering: while an overlapping clustering, within a uniquely defined subspace, clusters are not expected to overlap

Connectivity models: for example, hierarchical clustering builds models based on distance connectivity.
Centroid models: for example, the k-means algorithm represents each cluster by a single mean vector.
Distribution models: clusters are modeled using statistical distributions, such as multivariate normal distributions used by the expectation-maximization algorithm.
Density models: for example, DBSCAN and OPTICS defines clusters as connected dense regions in the data space.
Subspace models: in biclustering (also known as co-clustering or two-mode-clustering), clusters are modeled with both cluster members and relevant attributes.
Group models: some algorithms do not provide a refined model for their results and just provide the grouping information.
Graph-based models: a clique, that is, a subset of nodes in a graph such that every two nodes in the subset are connected by an edge can be considered as a prototypical form of cluster. Relaxations of the complete connectivity requirement (a fraction of the edges can be missing) are known as quasi-cliques, as in the HCS clustering algorithm.
Neural models: the most well known unsupervised neural network is the self-organizing map and these models can usually be characterized as similar to one or more of the above models, and including subspace models when neural networks implement a form of Principal Component Analysis or Independent Component Analysis.
A "clustering" is essentially a set of such clusters, usually containing all objects in the data set. Additionally, it may specify the relationship of the clusters to each other, for example, a hierarchy of clusters embedded in each other. Clusterings can be roughly distinguished as:

Hard clustering: each object belongs to a cluster or not
Soft clustering (also: fuzzy clustering): each object belongs to each cluster to a certain degree (for example, a likelihood of belonging to the cluster)
There are also finer distinctions possible, for example:

Agglomerative Hierarchical Clustering
K-Means
X-Means
G-Means
Deterministic Annealing Clustering
Sequential Information Bottleneck
CLARANS
BIRCH
DBScan
DENCLUE
Spectral Clustering
Minimum Entropy Clustering

人群价值模型
RFM
