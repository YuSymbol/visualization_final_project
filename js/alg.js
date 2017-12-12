/****************************** add some function to js **************************/
Array.prototype.contains = function ( needle ) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}

Array.prototype.unique = function(){
 var res = [];
 var json = {};
 for(var i = 0; i < this.length; i++){
  if(!json[this[i]]){
   res.push(this[i]);
   json[this[i]] = 1;
  }
 }
 return res;
}

Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}
/********************************************************************************/



//生成画布        
var width = 900;
var height = 540;
var svg = d3.select("body").append("svg")
	.attr("width",width)
	.attr("height",height);

//邻接矩阵
const adj = [[0, 8, 0, 0, 6, 0, 0, 7, 0, 0],
		   [8, 0, 9, 6, 7, 0, 0, 0, 0, 0],
		   [0, 9, 0, 5, 0, 0, 0, 0, 0, 6],
		   [0, 6, 5, 0, 9, 5, 0, 0, 0, 0],
		   [6, 7, 0, 9, 0, 0, 4, 0, 0, 0],
		   [0, 0, 0, 5, 0, 0, 3, 0, 3, 8],
		   [0, 0, 0, 0, 4, 3, 0, 6, 9, 0],
		   [7, 0, 0, 0, 0, 0, 6, 0, 5, 0],
		   [0, 0, 0, 0, 0, 3, 9, 5, 0, 8],
		   [0, 0, 6, 0, 0, 8, 0, 0, 8, 0]];
const node_num = 10;
var x1 = 200;
var x2 = 400;
var x3 = 500;
var x4 = 600;
var x5 = 800;

var y1 = 100;
var y2 = 200;
var y3 = 300;
var y4 = 400;
var y5 = 500;

var r = 25;
var r2 = 30;

var circleStrokeWidth = 4.0;
var circleStroke = "red";
var circleFill = "royalblue";

//文字相对圆心的偏离位置
var circleTextXof = -5;
var circleTextYof = 8;

//点之间连线的颜色
var line_color  = "pink";
var line_color_gone = "black";

//连线的粗细
var line_width = 6;
var line_width_hover = 8;

//线的透明度
var line_opacity = .8;
var line_opacity_hover = 1;


//点的坐标（圆心坐标）
var coordinate = [{'cx':x1,'cy':y3},{'cx':x2,'cy':y5},{'cx':x4,'cy':y5},{'cx':x3,'cy':y4},
					{'cx':x2,'cy':y3},{'cx':x4,'cy':y3},{'cx':x3,'cy':y2},{'cx':x2,'cy':y1},
					{'cx':x4,'cy':y1},{'cx':x5,'cy':y3}];

var nodeName = ["s", "A", "B", "C", "D", "E", "F", "G", "H", "t"];

//每个点处在的线
var node_lines = new Array(adj.length);

function init_graph(){
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
                    .attr("fill","black");
            }
        }
        
        //设置点的事件（划上、划出、点击、双击）
        var g = svg.append("g")
            .on("mouseover",function(){
                //改变点的大小
                d3.select(this)
                    .select("circle")
                    .transition()
                    .duration(300)
                    .attr("opacity",1)
                    .attr("r",r2);
                //改变文字"A"、"B"的大小
                d3.select(this)
                    .select("text")
                    .transition()
                    .duration(300)	
                    .attr("font-size",25);
                //改变点连接到的线的粗细
                /*
                node_lines[index].forEach(function(element,index,array){
                    element.transition()
                    .duration(300)
                    .attr("stroke-width",line_width_hover)
                    .attr("opacity",line_opacity_hover);
                });
                */
            })
            .on("mouseout",function(){
                //恢复点的颜色
                d3.select(this)
                    .select("circle")
                    .transition()
                    .duration(300)
                    .attr("opacity",.9)
                    .attr("r",r);
                //恢复文字的大小
                d3.select(this)
                    .select("text")
                    .transition()
                    .duration(300)
                    .attr("font-size",20);
                /*
                //恢复线的粗细
                node_lines[index].forEach(function(element,index,array){
                    element.transition()
                    .duration(300)
                    .attr("stroke-width",line_width)
                    .attr("opacity",line_opacity);
                });
                */
            })
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
            .attr("fill","black")
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
	}else if(text == 8){
        dijstra(index);
    }
}


function prim(index){
    var nodes = [];
    var edges = [];
    var lowcost=[];
    var mid =[];

    for(var i=0;i<node_num;i++){
        lowcost[i]=adj2[index][i];	//	各个点距离初始点的距离
        mid[i]=index;
    }
    console.log(lowcost)	

    var min;
    var minid;
    var sum=0;

    nodes.push(index);	//	加入的节点顺序
    console.log(nodes);
    for(var i=1;i<node_num;i++){
        min = 100;
        minid=-1;
        for(var j=0;j<node_num;j++){
            if(lowcost[j]!=0&&lowcost[j]<min){
                min = lowcost[j];
                minid=j;
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
        console.log(nodeName[mid[minid]]+"到"+nodeName[minid]+"权值:"+min);
        for(var j=0;j<node_num;j++){
            if(lowcost[j]!=0&&lowcost[j]>adj2[minid][j]){
                lowcost[j]=adj2[minid][j];
                mid[j]=minid;
            }
        }
    }
    console.log(nodes);
    console.log(mid);
    for(var i=0;i<node_num;i++){
        console.log(nodeName[mid[i]]+" "+nodeName[i])
    }
}

//执行广度优先遍历
function BFS(index){
	/*
		index : 开始的点
	*/
	
	var color = [0,0,0,0,0,0,0,0,0,0];			//0白色,1灰色,2黑色
	var d = [10,10,10,10,10,10,10,10,10,10];	//深度,(让动画产生和层次相应的delay)
	var queue = [];								//保存灰色的点
	var parent = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];//保存这个点的父节点
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
	
	//根据深度，delay，改变颜色
	d3.selectAll("circle")[0].forEach(function(element,ii,array){
			var c = "black";
			if(color[ii] == 2){
				c = "red";
			}
			
			//当前的圆,改变颜色
			d3.select(element)
				.transition()
				.delay((d[ii]-1)*1500)
				.duration(d[ii]==1?100:600)
				.attr("fill",c);
			
			//当前点的父节点有没有，没有->不可到达或者根节点
			var paren = parent[ii];

			if(paren==-1) return;
			//当前的圆所在的边 和 其父节点所在的边 的交集，（唯一），经由这条边到达
			var cur_node_lines = node_lines[ii];
			var pare_node_lines = node_lines[paren];
			for(var cur_i of cur_node_lines){
				for(var pare_i of pare_node_lines){
					if(cur_i[0] === pare_i[0]){
						d3.select(cur_i[0][0])
							.transition()
							.delay((d[ii]-2)*1500)
							.duration(d[ii]==1?100:600)
							.attr("stroke",line_color_gone);
						return;
					}
				}
			}
				
		});
}
//执行深度优先遍历
function DFS(index){	
	/*
		index : 开始的点
	*/
	
	var color = [0,0,0,0,0,0,0,0,0,0];	//0白色,1灰色,2黑色
	var d = [10,10,10,10,10,10,10,10,10,10];		//深度,(让动画产生和层次相应的delay)
	var time = 0;         //当前次序
	var parent = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];//保存这个点的父节点
	
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

	//根据深度，delay，改变颜色
	d3.selectAll("circle")[0].forEach(function(element,ii,array){
			var c = "black";
			if(color[ii] == 2){
				c = "red";
			}
			
			//当前的圆,改变颜色
			d3.select(element)
				.transition()
				.delay((d[ii]-1)*1500)
				.duration(d[ii]==1?100:600)
				.attr("fill",c);
			
			//当前点的父节点有没有，没有->不可到达或者根节点
			var paren = parent[ii];

			if(paren==-1) return;
			//当前的圆所在的边 和 其父节点所在的边 的交集，（唯一），经由这条边到达
			var cur_node_lines = node_lines[ii];
			var pare_node_lines = node_lines[paren];
			for(var cur_i of cur_node_lines){
				for(var pare_i of pare_node_lines){
					if(cur_i[0] === pare_i[0]){
						d3.select(cur_i[0][0])
							.transition()
							.delay((d[ii]-2)*1500)
							.duration(d[ii]==1?100:600)
							.attr("stroke",line_color_gone);
						return;
					}
				}
			}
				
		});
}

var node_color_end = "green";
//var node_color = circleFill;
//var line_color = 
var line_visited = "red";
var line_gone = "black";
function dijstra(index){  
    //min dist
    var d = [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity];
    //pre node
    var p = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
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
    var Q = [0,1,2,3,4,5,6,7,8,9];

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
        changeCircleColor(minIndex,node_color_end,delay,100);
        delay = delay + delay_interupt;
        
        if(S.length==node_num){// end 
            return ;
        }
        
        /** set-or **/
        S = S.unique(S.push(minIndex));
        if(S.length>1){
            var lastElement = S[S.length-1];
            console.log(lastElement);
            changeLineColor(lastElement,p[lastElement],line_color_gone,delay-delay_interupt,100);
            delay = delay + delay_interupt; 
    
        }
        
        /** for each v in adj[u] **/
        for(i=0 ; i<node_num ; i++){
            if(adj[minIndex][i]!=0 && Q.contains(i)){//i is in adj and  not visit
            
                //////////////////////////  判断当前点  ///////////////////////////////
                
                changeLineColor(minIndex,i,"green",delay,100);
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
    console.log(d);
    console.log(p);
}

function changeCircleColor(index,c,delay_,duration_){
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
}

function changeLineColor(i,j,c,delay_,duration_){
    /**
    *   i:一个点的index
    *   j:另一个点的index
    *   c:将变成的颜色
    *   delay_:延迟多少ms后，开始执行
    *   duration:动画执行的时间
    **/
    //点i所在的边 和 点j所在的边 的交集，（唯一），经由这条边到达
    var i_node_lines = node_lines[i];
    var j_node_lines = node_lines[j];
    for(var cur_i of i_node_lines){
        for(var pare_i of j_node_lines){
            if(cur_i[0] === pare_i[0]){
                d3.select(cur_i[0][0])
                    .transition()
                    .delay(delay_)
                    .duration(duration_)
                    .attr("stroke",c);
                return;
            }
        }
    }
}

function dijstra1(index){  
    //min dist
    var d = [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity];
    //pre node
    var p = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
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
    
    
    var S = [index];
    var Q = [0,1,2,3,4,5,6,7,8,9];
    Q.removeByValue(index);

    while(Q.length !=0){
        
        console.log(S);
        
        
        /** min dequeue **/
        var minIndex = Q[0]; 
        var i = 0;
        for( ; i < node_num ; i++ ){
            //element in Q  and cording dist is min          
            if(Q.contains(i) && d[i] < d[minIndex]){
                minIndex = i;
            }
        }
        Q.removeByValue(minIndex);
        console.log(minIndex);
        
        if(S.length==node_num){// end 
            return 
        }
        
        /** set-or **/
        S = S.unique(S.push(minIndex));
        
        /** for each v in adj[u] **/
        for(i=0 ; i<node_num ; i++){
            if(adj[minIndex][i]!=0){//i is in adj
                //relax
                if(d[i]>d[minIndex]+adj[i][minIndex]){
                    d[i] = d[minIndex] + adj[i][minIndex];
                    p[i] = minIndex; 
                    
                }
            }
        }
    }
    console.log(d);
    console.log(p);
}

    