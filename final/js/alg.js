var init_graph;

(function(){
    //生成画布        
    var width = $("#alg_ground").width();
    var height = $("#alg_ground").height();
    var svg = d3.select("body").select("#alg_ground").append("svg")
        .attr("width",width)
        .attr("height",height);
    //console.log(d3.select("body").select("#d2"));

    const adj = [[0, 8, 0, 0, 6, 0, 0, 7, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [8, 0, 9, 6, 7, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 9, 0, 5, 0, 0, 0, 0, 0, 6,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 6, 5, 0, 9, 5, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [6, 7, 0, 9, 0, 0, 4, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 5, 0, 0, 3, 0, 3, 8,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 4, 3, 0, 6, 9, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [7, 0, 0, 0, 0, 0, 6, 0, 5, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 3, 9, 5, 0, 8,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 6, 0, 0, 8, 0, 0, 8, 0,   9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 9,   0, 7, 0, 0, 6, 0, 0, 8, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   7, 0, 6, 5, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 6, 0, 3, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 5, 3, 0, 0, 0, 1, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   6, 0, 0, 0, 0, 0, 4, 5, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 9, 2],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 1, 4, 0, 0, 3, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   8, 0, 0, 0, 5, 0, 3, 0, 1, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 9, 0, 1, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 2, 0, 0, 0, 0]];


    const adj2 =  [[0, 8, Infinity, Infinity, 6,    Infinity, Infinity, 7, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,   Infinity, Infinity, Infinity, Infinity, Infinity],
                 [8, 0, 9, 6, 7,  Infinity, Infinity, Infinity, Infinity, Infinity,   Infinity, Infinity, Infinity, Infinity, Infinity,   Infinity, Infinity, Infinity, Infinity, Infinity],
                 [Infinity, 9, 0, 5, Infinity, Infinity, Infinity, Infinity, Infinity, 6,     Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity],
                 [Infinity, 6, 5, 0, 9, 5, Infinity, Infinity, Infinity, Infinity,     Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity],
                 [6, 7, Infinity, 9, 0, Infinity, 4, Infinity, Infinity, Infinity,     Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity],
                 [Infinity, Infinity, Infinity, 5, Infinity, 0, 3, Infinity, 3, 8,     Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity],
                 [Infinity, Infinity, Infinity, Infinity, 4, 3, 0, 6, 9, Infinity,     Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity],
                 [7, Infinity, Infinity, Infinity, Infinity, Infinity, 6, 0, 5, Infinity,     Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity],
                 [Infinity, Infinity, Infinity, Infinity, Infinity, 3, 9, 5, 0, 8,     Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity],
                 [Infinity, Infinity, 6, Infinity, Infinity, 8, Infinity, Infinity, 8, 0,     9, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, 9, 0,7,Infinity,Infinity,6,    Infinity,Infinity,8,Infinity,Infinity],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,  7,0,6,5,Infinity,    Infinity,Infinity,Infinity,Infinity,Infinity],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,  Infinity,6,0,3,Infinity,    Infinity,Infinity,Infinity,Infinity,Infinity],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,  Infinity,5,3,0,Infinity,    Infinity,1,Infinity,Infinity,Infinity],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,  6,Infinity,Infinity,Infinity,0, Infinity,4,5,Infinity,Infinity],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,  Infinity,Infinity,Infinity,Infinity,Infinity,   0,Infinity,Infinity,9,2],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,  Infinity,Infinity,Infinity,1,4, Infinity,0,3,Infinity,Infinity],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,  8,Infinity,Infinity,Infinity,5,  Infinity,3,0,1,Infinity,],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,  Infinity,Infinity,Infinity,Infinity,Infinity,   9,Infinity,1,0,Infinity],
                 [Infinity, Infinity, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,  Infinity,Infinity,Infinity,Infinity,Infinity,   2,Infinity,Infinity,Infinity,0]];


    //二十个的版本
    const node_num = 20;

    var colcount = 15;
    var singlewid = width/colcount;


    // var x1 = 80;
    // var offset = x1;
    var x1 = singlewid*1;

    var x2 = singlewid*3;
    var x3 = singlewid*4;
    var x4 = singlewid*5;
    var x5 = singlewid*7;
    var x6 = singlewid*8;
    var x7 = singlewid*10;
    var x8 = singlewid*11;
    var x9 = singlewid*12;
    var x10 = singlewid*14;
    // var x2 = 200+offset;
    // var x3 = 300+offset;
    // var x4 = 400+offset;
    // var x5 = 600+offset;
    // var x6 = 700+offset;
    // var x7 = 900+offset;
    // var x8 = 1000+offset;
    // var x9 = 1100+offset;
    // var x10 = 1300+offset;



    var offsety = -50;
    var y1 = 100+offsety;
    var y2 = 200+offsety;
    var y3 = 300+offsety;
    var y4 = 400+offsety;
    var y5 = 500+offsety;

    var delay1 = 300; //  时间间隔,for prim
    var dura1 = delay1/2; //  过度时间,for prim

    var delay2 = 500; //  for kruskal
    var dura2 = delay2/2; //  for kruskal

    var r = 25;
    var r2 = 30;

    var circleStrokeWidth = 4.0;
    var circleStroke = "red"; //  初始描边
    var circleFill = "royalblue"; //  初始颜色

    var circleStart = "Maroon"; //  选中点的颜色
    var circleOther = "pink";  //  其他点的颜色
    var circleTemp = "red"; //  过程点的颜色

    //文字相对圆心的偏离位置
    var circleTextXof = -5;
    var circleTextYof = 8;

    var textcolor = "white";
    var textcolorend = "black";
    //点之间连线的颜色
    var line_color  = "darkgrey";
    var line_color_gone = "red";  //  
    var line_color_temp = "gold"; //  过程边的颜色

    //连线的粗细
    var line_width = 6;
    var line_width_hover = 8;

    var line_width_change = 12;

    //线的透明度
    var line_opacity = .8;
    var line_opacity_hover = 1;


    var coordinate = [{'cx':x1,'cy':y3},{'cx':x2,'cy':y5},{'cx':x4,'cy':y5},{'cx':x3,'cy':y4},
                     {'cx':x2,'cy':y3},{'cx':x4,'cy':y3},{'cx':x3,'cy':y2},{'cx':x2,'cy':y1},
                     {'cx':x4,'cy':y1},{'cx':x5,'cy':y3},
                     {'cx':x6,'cy':y3},{'cx':x7,'cy':y5},{'cx':x9,'cy':y5},{'cx':x8,'cy':y4},
                     {'cx':x7,'cy':y3},{'cx':x9,'cy':y3},{'cx':x8,'cy':y2},{'cx':x7,'cy':y1},
                     {'cx':x9,'cy':y1},{'cx':x10,'cy':y3}];
    var nodeName = ["s", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "t"];

    //每个点处在的线
    var node_lines = new Array(adj.length);

     init_graph = function(){
        d3.selectAll("circle").remove();
        d3.selectAll("line").remove();
        d3.selectAll("g").remove();
        d3.selectAll("text").remove();
        
        for(var i=0;i<node_lines.length;i++){
            node_lines[i]=[];
        }
        //根据坐标开始绘制
        coordinate.forEach(function(element,index,array){
            var index = index;
            //绘制线
            for(var j = index+1;j<node_lines.length;j++){
                if(adj[index][j]){
                    var line = svg.append("line")
                        .attr("x1",coordinate[index].cx)
                        .attr("x2",coordinate[j].cx)
                        .attr("y1",coordinate[index].cy)
                        .attr("y2",coordinate[j].cy)
                        .attr("stroke",line_color)
                        .attr("stroke-width",line_width)
                        .attr("opacity",line_opacity);
                    //将线放到index和j节点的数组下
                    node_lines[index].push(line);
                    node_lines[j].push(line);

                    //显示边的权重
                    svg.append("text")
                        .attr("x",(coordinate[index].cx+coordinate[j].cx)/2+(index-j)*6)
                        .attr("y",(coordinate[index].cy+coordinate[j].cy)/2+(index-j)*4)
                        .text(adj[index][j])
                        .attr("fill",textcolor);
                }
            }
            
            //设置点的事件（划上、划出、点击、双击）
            var g = svg.append("g")
                .on("click",function (){onClick(index)});
            
            //绘制圆
            g.append("circle")
                .attr("cx", element.cx)
                .attr("cy", element.cy)
                .attr("r",r)
                .attr("fill",circleFill)
                .attr("opacity",.9)
                .attr("stroke",circleStroke)
                .attr("stroke-width",circleStrokeWidth);
                
            //绘制圆上的文字 A、B
            g.append("text")
                .attr("x", element.cx+circleTextXof)
                .attr("y", element.cy+circleTextYof)
                .text(nodeName[index])
                .attr("fill",textcolor)
                .attr("opacity",.9)
                .attr("font-size",20);
        });
    }

    function onClick(index){
        var text = $("#selectResult").val();
        //深度优先遍历
        if(text == 1){
            DFS(index);
        }else if(text ==2){
            BFS(index);
        }else if(text == 5){
            dijstra(index);
        }else if(text == 3){
            kruskal(index);
        }else if(text == 4){
            prim(index);
        }else if(text ==7){
            SPFA(index);
        }else if(text ==8){
            SPFA_SLF(index);
        }else if(text ==9){
            SPFA_LLL(index);
        }else if(text ==6){
            //SPFA_LLL(index);
            floyd();
        }
    }

    //  获取边的对象：node1,node2,weight
    function getE(E){
        // var E = []
        for(var i=0;i<node_num;i++){

            for(var j=0;j<node_num;j++){
                if(adj[i][j]){
                    e={}
                    e.node1=i;
                    e.node2=j;
                    e.weight=adj[i][j];
                    E.push(e);
                }
            }
        }
    }

    //  获取边的对象，不重复
    function getE2(E){
        // var E = []
        for(var i=0;i<node_num;i++){

            for(var j=i;j<node_num;j++){
                if(adj[i][j]){
                    e={}
                    e.node1=i;
                    e.node2=j;
                    e.weight=adj[i][j];
                    E.push(e);
                }
            }
        }
    }

    var by = function(name){    //  对象排序方法
     return function(o, p){
       var a, b;
       if (typeof o === "object" && typeof p === "object" && o && p) {
         a = o[name];
         b = p[name];
         if (a === b) {
           return 0;
         }
         if (typeof a === typeof b) {
           return a < b ? -1 : 1;
         }
         return typeof a < typeof b ? -1 : 1;
       }
       else {
         throw ("error");
       }
     }
    }

    function kruskal(index){
        var E = [];
        getE2(E);
        //console.log(E);

        var time=0;
        E.sort(by("weight"));   //  获得排序后的行

        var m = node_num;
        var n = E.length;
        //console.log(n);

        var treelist = [];  //  创建一个Set类型的数组，每个Set表示一棵树，treelist表示森林
        var edges = []; //  

        //每个节点初始化成一棵树
        for(var i=0;i<m;i++){
            var set = new Set();
            set.add(i);
            treelist.push(set);
        }
        //console.log(treelist);

        // get each line
        for(var i=0;i<n;i++){
            edge = E[i];
            var a = edge.node1;
            var b = edge.node2;

            changeCircleColor(a,circleOther,delay2*time,dura2);
            changeCircleColor(b,circleOther,delay2*time,dura2);
            changeLineColor(a,b,line_color_gone,delay2*time++,dura2);
            
            var counta=-1;
            var countb=-1;

            //get the tree of a and b
            for(var j=0;j<treelist.length;j++){
                var set = treelist[j];
                if(set.has(a)){
                    counta=j;
                }
                if(set.has(b)){
                    countb=j;
                }
            }
            //do not get the point
            if(counta==-1||countb==-1){
                return;
            } else {
                if(counta!=countb){
                    var set1=treelist[counta];
                    var set2=treelist[countb];
                    set2.forEach(function(item){
                        set1.add(item); //  把b所在的树中的每一个节点都合并到a所在的树中
                    });
                    //Note that we will delete 2 sets continuously
                    if(counta<countb){
                        treelist.splice(counta,1);
                        treelist.splice(countb-1,1);
                    } else {
                        treelist.splice(countb,1);
                        treelist.splice(counta-1,1);
                    }
                    treelist.push(set1);    //  add the big set to treelist set.
                    edges.push(edge);   //   add this edge to edges set.
                    //console.log("边("+edge.node1+","+edge.node2+","+edge.weight+") 加入");
                } else {
                    changeLineColor(a,b,line_color,delay2*time++,dura2,true);
                    //console.log("两点已经在同一棵树中");
                }
            }
            if(edges.length==node_num){
                break;
            }
        }
    }

    /*
        边变灰、点变绿是搜索过程，搜索的是所有和当前点集合相连的边
        最后这些边中其中一个变黑、一个点边红是搜索的结果
    */
    function prim(index){
        var nodes = [];
        var edges = [];
        var lowcost=[];
        var mid =[];

        for(var i=0;i<node_num;i++){
            lowcost[i]=adj2[index][i];	//	各个点距离初始点的距离
            mid[i]=index;
        }
        //console.log(lowcost)	

        var min;
        var minid;
        var sum=0;

        var time = 0;
        nodes.push(index);	//	加入的节点顺序
        //console.log(nodes);
        changeCircleColor(index, circleStart, delay1*time++, dura1,true);  //  先把初始点颜色改变

        for(var i=1;i<node_num;i++){
            min = 100;
            minid=-1;
            for(var j=0;j<node_num;j++){

                if(lowcost[j]!=0&&lowcost[j]<Infinity){
                    //  只要有边都要改一下
                    changeCircleColor(j, circleTemp, delay1*time,dura1);
                    changeLineColor(mid[j], j, line_color_temp, delay1*time++,dura1);
                    if(lowcost[j]<min){
                        min = lowcost[j];
                        minid=j;
                    } 
                    //  再给改回去
                    changeCircleColor(j, circleFill, delay1*time,dura1);
                    changeLineColor(mid[j], j, line_color, delay1*time++,dura1,true);
                    
                    
                }
            }
            if(minid==-1){
                console.log(i+"fail");
                console.log(nodes);
                return;
            } 

            nodes.push(minid);	//	把找到的这个点放入nodes数组
            lowcost[minid]=0;
            sum=sum+min;	//	总权重
            //console.log(nodeName[mid[minid]]+"到"+nodeName[minid]+"权值:"+min);
            changeCircleColor(minid,circleOther, delay1*time, dura1);
            changeLineColor(mid[minid], minid, line_color_gone, delay1*time++, dura1);
            for(var j=0;j<node_num;j++){
                if(lowcost[j]!=0&&lowcost[j]>adj2[minid][j]){
                    lowcost[j]=adj2[minid][j];
                    mid[j]=minid;
                }
            }
        }
        //console.log(nodes);
        //console.log(mid);
        for(var i=0;i<node_num;i++){
            console.log(nodeName[mid[i]]+" "+nodeName[i])
        }
    }

    //执行广度优先遍历
    function BFS(index){
        /*
            index : 开始的点
        */
        
        var color = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];			//0白色,1灰色,2黑色
        var d = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];	//深度,(让动画产生和层次相应的delay)
        var queue = [];								//保存灰色的点
        var parent = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];//保存这个点的父节点
        //init paramaters
        queue.push(index);
        d[index] = 1;

        while(queue.length !=0){
            var u = queue.shift();
            for(var i =0;i< node_num;i++){
                if(adj[u][i]!=0 && color[i]==0 && i!=u){
                        color[i] = 1;
                        d[i] = d[u]+1;
                        parent[i] = u;
                        queue.push(i);
                }
            }
            color[u] =2;
        }
        changeCircleColor(index,circleStart,0,500,true)
        //根据深度，delay，改变颜色
        d3.selectAll("circle")[0].forEach(function(element,ii){
            if(color[ii] == 2){
                c = circleOther;
            }
            if(ii==index){
                return;
            }
            //当前的圆,改变颜色
            changeCircleColor(ii,c,(d[ii]-1)*1500,d[ii]==1?100:600)
            
            //当前点的父节点有没有，没有->不可到达或者根节点
            var paren = parent[ii];

            if(paren==-1) return;
            
            changeLineColor(ii,parent[ii],line_color_gone,(d[ii]-2)*1500,d[ii]==1?100:600); 
        })
    
    }
    //执行深度优先遍历
    function DFS(index){	
        /*
            index : 开始的点
        */
        
        var color = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];	//0白色,1灰色,2黑色
        var d = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];		//深度,(让动画产生和层次相应的delay)
        var time = 0;         //当前次序
        var parent = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];//保存这个点的父节点
        
        (function Dfs_visit(s){
            color[s] = 1;
            time ++;
            d[s] = time;
            for(var i =0;i< node_num;i++){
                if(adj[s][i]!=0 && color[i]==0){
                    parent[i] = s;
                    Dfs_visit(i);							
                }
            }
            color[s] =2;
        })(index);
        changeCircleColor(index,circleStart,0,500,true)

        //根据深度，delay，改变颜色
        d3.selectAll("circle")[0].forEach(function(element,ii){
      
            if(color[ii] == 2){
                c = circleOther;
            }
            if(ii==index){
                return;
            }
            
            //当前的圆,改变颜色
            changeCircleColor(ii,c,(d[ii]-1)*1500,d[ii]==1?100:600)
            
            //当前点的父节点有没有，没有->不可到达或者根节点
            var paren = parent[ii];

            if(paren==-1) return;
            
            changeLineColor(ii,parent[ii],line_color_gone,(d[ii]-2)*1500,d[ii]==1?100:600); 
        })


        // //根据深度，delay，改变颜色
        // d3.selectAll("circle")[0].forEach(function(element,ii,array){
        //         var c = "black";
        //         if(color[ii] == 2){
        //             c = "red";
        //         }
                
        //         //当前的圆,改变颜色
        //         d3.select(element)
        //             .transition()
        //             .delay((d[ii]-1)*1500)
        //             .duration(d[ii]==1?100:600)
        //             .attr("fill",c);
                
        //         //当前点的父节点有没有，没有->不可到达或者根节点
        //         var paren = parent[ii];

        //         if(paren==-1) return;
        //         //当前的圆所在的边 和 其父节点所在的边 的交集，（唯一），经由这条边到达
        //         var cur_node_lines = node_lines[ii];
        //         var pare_node_lines = node_lines[paren];
        //         for(var cur_i of cur_node_lines){
        //             for(var pare_i of pare_node_lines){
        //                 if(cur_i[0] === pare_i[0]){
        //                     d3.select(cur_i[0][0])
        //                         .transition()
        //                         .delay((d[ii]-2)*1500)
        //                         .duration(d[ii]==1?100:600)
        //                         .attr("stroke",line_color_gone);
        //                     return;
        //                 }
        //             }
        //         }
                    
        //     });
    }

    var node_color_end = "red";
    //var node_color = circleFill;
    //var line_color = 
    var line_visited = "grey";
    var line_gone = "black";

    function dijstra(index){  
        //min dist
        var d = [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity,Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity];
        //pre node
        var p = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        for(var i = 0;i<node_num;i++){
            if(adj[index][i]!=0){
                d[i] = adj[index][i];
                p[i] = index;
            }
        }
        d[index] = 0;
        
        for(var i=0;i<node_num;i++){     
            if(adj[index][i] != 0){
                d[i] = adj[index][i]           
            }
        }
        
        var S = [];
        var Q = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

        var delay = 0;
        var delay_interupt  = 300;
        

        while(Q.length !=0){
        
            /** min dequeue **/
            var minIndex = Q[0]; 
            for(var i of Q ){//element in Q
                // dist is min          
                if(d[i] < d[minIndex]){
                    minIndex = i;
                }
            }
            Q.removeByValue(minIndex);
            
            
            //////////////////// 
            if(minIndex==index){
                changeCircleColor(minIndex,circleStart,delay,100,true);

            }else {
                changeCircleColor(minIndex,circleOther,delay,100);

            }
            delay = delay + delay_interupt;
            
            if(S.length==node_num){// end 
                return ;
            }
            
            /** set-or **/
            S = S.unique(S.push(minIndex));
            if(S.length>1){
                var lastElement = S[S.length-1];
                //console.log(lastElement);
                changeLineColor(lastElement,p[lastElement],line_color_gone,delay-delay_interupt,100);
                delay = delay + delay_interupt; 
        
            }
            
            /** for each v in adj[u] **/
            for(i=0 ; i<node_num ; i++){
                if(adj[minIndex][i]!=0 && Q.contains(i)){//i is in adj and  not visit
                
                    //////////////////////////  判断当前点  ///////////////////////////////
                    
                    changeLineColor(minIndex,i,line_color_temp,delay,100);
                    delay = delay + delay_interupt;
                    
                    //relax
                    if(d[i]>d[minIndex]+adj[i][minIndex]){
                        d[i] = d[minIndex] + adj[i][minIndex];
                        p[i] = minIndex; 
                    }
                    changeLineColor(minIndex,i,line_visited,delay,100);
                    delay = delay + delay_interupt;
                }
            }
            
            
            
        }
        //console.log(d);
        //console.log(p);
    }

    function changeCircleColor(index,c,delay_,duration_,start){
        /**
        *   index:点的序号
        *   c:将变成的颜色
        *   delay_:延迟多少ms后，开始执行
        *   duration:动画执行的时间
        **/
        

        d3.select(d3.selectAll("circle")[0][index])
            .transition()
            .delay(delay_)
            .duration(duration_)
            .attr("fill",c);
         d3.select(d3.selectAll("g text")[0][index])
            .transition()
            .delay(delay_)
            .duration(duration_)
            .attr("fill",textcolorend);
            

        if(start==true){
          d3.select(d3.selectAll("circle")[0][index])
            .transition()
            .delay(delay_)
            .duration(duration_)
            .attr("stroke",c)
            .attr("fill", c);
        
         d3.select(d3.selectAll("g text")[0][index])
            .transition()
            .delay(delay_)
            .duration(duration_)
            .attr("fill",textcolor);
        }
    }

    function changeLineColor(i,j,c,delay_,duration_,reback){
        /**
        *   i:一个点的index
        *   j:另一个点的index
        *   c:将变成的颜色
        *   delay_:延迟多少ms后，开始执行
        *   duration:动画执行的时间
        **/
        //点i所在的边 和 点j所在的边 的交集，（唯一），经由这条边到达
        var line = line_width_change;
        if(reback==true){
          line = line_width;
        }

        var i_node_lines = node_lines[i];
        var j_node_lines = node_lines[j];
        for(var cur_i of i_node_lines){
            for(var pare_i of j_node_lines){
                if(cur_i[0] === pare_i[0]){
                    d3.select(cur_i[0][0])
                        .transition()
                        .delay(delay_)
                        .duration(duration_)
                        .attr("stroke",c)
                        .attr("stroke-width", line);
                    return;
                }
            }
        }
    }


function SPFA(index){
    
    var delay = 0;
    var delay_interupt  = 300;
    
    
    Q = []
    d = [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity]
    //pre node
    var p = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    
    Q.push(index);//向尾部加
    d[index] = 0;
    
    changeCircleColor(index, circleStart, delay, 100,true);


    while(Q.length!=0){

        var now = Q.shift();//删掉头
        if(now!=index){
            changeCircleColor(now,circleOther,delay,100);
        } 

       
        
        delay = delay + delay_interupt;
        
        if(p[now]!=-1){
            changeLineColor(now,p[now],line_color_gone,delay,100);
            delay = delay + delay_interupt; 
        }
        
        
        for(var j=0;j<node_num;j++){
            if(adj[now][j]){
                if(d[j]>d[now]+adj[now][j]){
                    d[j] = d[now] + adj[now][j] //relax
                    if(p[j]!=-1){
                        changeLineColor(j,p[j],line_color,delay,100);
                        delay = delay + delay_interupt;
                    }
                    p[j] = now
                    if(!Q.contains(j)){//不在Q中，加入Q中
                        Q.push(j);
                        changeLineColor(j,p[j],line_color_temp,delay,100);
                        delay = delay + delay_interupt;
                    }
                }
            }
        }
    }
    //console.log(d);
    //console.log(p);
}

function SPFA_SLF(index){
    
    var delay = 0;
    var delay_interupt  = 300;
    
    var Q = []
    var d = [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity]
    //pre node
    var p = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    
    Q.push(index);//向尾部加
    d[index] = 0;
    changeCircleColor(index, circleStart, delay, 100,true);

    while(Q.length!=0){
        var now = Q.shift();//删掉头
        if(now!=index)
            changeCircleColor(now,circleOther,delay,100);
        delay = delay + delay_interupt;
        
        if(p[now]!=-1){
            changeLineColor(now,p[now],line_color_gone,delay,100);
            delay = delay + delay_interupt; 
        }
        
        
        for(var j=0;j<node_num;j++){
            if(adj[now][j]){
                if(d[j]>d[now]+adj[now][j]){
                    d[j] = d[now] + adj[now][j] //relax
                    
                    if(p[j]!=-1){
                        changeLineColor(j,p[j],line_color,delay,100);
                        delay = delay + delay_interupt;
                    }
                    
                    p[j] = now
                    if(!Q.contains(j)){//不在Q中，加入Q中
                    
                        //small label first
                        if(Q.length>0){
                            
                            if(d[j]<d[Q[0]]){
                                Q.unshift(j)
                            }else{
                                Q.push(j);        
                            }
                        }else{
                            Q.push(j);    
                        }
                        changeLineColor(j,p[j],line_color_temp,delay,100);
                        delay = delay + delay_interupt;
                        
                    }
                }
            }
        }
    }
    //console.log(d);
    //console.log(p);
}

function SPFA_LLL(index){
    var delay = 0;
    var delay_interupt  = 300;
    
    var Q = []
    var d = [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity]
    //pre node
    var p = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

    
    Q.push(index);//向尾部加
    d[index] = 0;
    changeCircleColor(index, circleStart, delay, 100,true);

    while(Q.length!=0){
        
        
        
        var x_ = 0;//平均值
        //var count_ = 0;//
        for(var i of Q){
            x_ = x_ + d[i];
        }
        x_ = x_ / Q.length;
        var now;
        while(true){
            now = Q.shift();//删掉头
            if(x_>d[now]){
                Q.push(now);
            }else{
                if(now!=index)
                    changeCircleColor(now,circleOther,delay,100);
                delay = delay + delay_interupt;
                if(p[now]!=-1){
                    changeLineColor(now,p[now],line_color_gone,delay,100);
                    delay = delay + delay_interupt; 
                }
                break;
            }
        }
        
        
        for(var j=0;j<node_num;j++){
            if(adj[now][j]){
                if(d[j]>d[now]+adj[now][j]){
                    d[j] = d[now] + adj[now][j] //relax
                    
                    
                    if(p[j]!=-1){
                        changeLineColor(j,p[j],line_color,delay,100);
                        delay = delay + delay_interupt;
                    }
                    
                    p[j] = now
                    if(!Q.contains(j)){//不在Q中，加入Q中
                        Q.push(j);    
                        
                        changeLineColor(j,p[j],line_color_temp,delay,100);
                        delay = delay + delay_interupt;
                    }
                }
            }
        }
    }
}
var color1 = "red";
var color2 = "green";
var color3 = "gold";

function floyd(){
    var delay = 0;
    var delay_interupt  = 80;
    
    //min dist
    var d = [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity];
    //pre node
    var p = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    //d[index] = 0;
    
    for(var k = 0 ;k<node_num;k++){
        changeCircleColor(k,color1,delay,100);
        delay = delay + delay_interupt;
        
        for(var i= 0;i<node_num;i++){
            if(k==i)continue;
            changeCircleColor(i,color2,delay,100);
            delay = delay + delay_interupt;
            
            
            for(var j = i+1;j<node_num;j++){
                if(k==j) continue;
                //if(i==j)continue;
                changeCircleColor(j,color3,delay,100);
                delay = delay + delay_interupt;
                
                if(d[i][j]>d[i][k]+d[k][j]){
                    d[i][j] = d[i][k]+d[k][j];
                    d[j][i] = d[i][k]+d[k][j];
                    
                    p[i][j] = k;
                    p[j][i] = k;
                    
                }
                
                changeCircleColor(j,circleFill,delay,100);
                delay = delay + delay_interupt;
            }
            changeCircleColor(i,circleFill,delay,100);
            delay = delay + delay_interupt;
        }
        changeCircleColor(k,circleFill,delay,100);
        delay = delay + delay_interupt;
    }
    /*
    var res = "<pre>";
    for(var i = 0;i<node_num;i++){
        for(var j = 0;j<node_num;j++){
            res = res + (d[i][j]+"\t");
        }
        res = res + "\n";
    }
    res = res + "</pre>";
    $("#showText").append(res);
    console.log(d);
    console.log(p);
    */
}
})()