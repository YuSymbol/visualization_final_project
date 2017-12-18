
var nodes = [];
var node_lines = new Array(20);

var times = [];


var std =  20;

var x1 = -13*std;
var x2 = -9*std;
var x3 = -7*std;
var x4 = -5*std;
var x5 = -1*std;
var x6 = 1*std;
var x7 = 5*std;
var x8 = 7*std;
var x9 = 9*std;
var x10 =13*std;

 var y1 = -4*std;
var y2 = -2*std;
var y3 = 0;
var y4 = 2*std;
var y5 = 4*std;

var camerax = 80;
var cameray = 120;
var cameraz = 220;
            
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
            
var delay1 = 300; //  时间间隔,for prim
var dura1 = delay1/2; //  过度时间,for prim

var delay2 = 500; //  for kruskal
var dura2 = delay2/2; //  for kruskal

var r = 25;
var r2 = 30;

var circleStrokeWidth = 4.0;
var circleStroke = "red"; //  初始描边
var circleFill = "royalblue"; //  初始颜色

var circleStart = "maroon"; //  选中点的颜色
var circleOther = "pink";  //  /点的颜色
var circleTemp = "lightseablue"; //  过程点的颜色

var backgroundcolor = "black";
var gridcolor = "white";

//文字相对圆心的偏离位置
var circleTextXof = -5;
var circleTextYof = 8;

//点之间连线的颜色

var line_color  = "white";
var line_color_gone = "orange";  //  
var line_color_temp = "gray"; //  过程边的颜色

//连线的粗细
var line_width = 6;
var line_width_hover = 8;

var line_width_change = 12;

//线的透明度
var line_opacity = .8;
var line_opacity_hover = 1;
            
// var nodeName = ["s", "A", "B", "C", "D", "E", "F", "G", "H", "t"];
var nodeName = ["s", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "t"];
            
var node_num=20;   
        
String.prototype.format = function () {

    var str = this;

    for ( var i = 0; i < arguments.length; i ++ ) {

        str = str.replace( '{' + i + '}', arguments[ i ] );

    }
    return str;

};

var container, stats;
var camera, scene, renderer;
var splineHelperObjects = [], splineOutline;
var splinePointsLength = 4;
var positions = [];
var options;

var size = std;
var geometry = new THREE.BoxGeometry( size, size, size );

var transformControl;

var ARC_SEGMENTS = 200;
var splineMesh;

var ssplines;

var params = {
    DFS: false,
    BFS: false,
    Prim:false,
    Kruskal:false,
    Dijkstra:false,
    Floyd:false,
    SPFA:false,
    SPFA_SLF:false,
    SPFA_LLL:false
};



var camera_posiotion = [];

function init_threeD_graph(){
    init();
    animate();
}


function stoper() {
    times.forEach(function(element,index){
        clearTimeout(element);
    })
    
}
var guishow = false;
    
function clear_all(){
    //saveCamera()
    for(var i=0;i<node_lines.length;i++){
        node_lines[i]=[];
    }
    stoper();
    nodes = []
    ssplines = [];
    $("#container *").remove();
    $("div.dg *").remove();    
}

function saveCamera(){
    if(camera){
        camera_posiotion[0] = camera.position.x
        camera_posiotion[1] = camera.position.y
        camera_posiotion[2] = camera.position.z
    }
}
function init() {

    clear_all();
    
    container = document.getElementById( 'container' );
    
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color( backgroundcolor );

    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    
    if(camera_posiotion.length<2){
        camera.position.set( camerax, cameray, cameraz );
        //console.log(camera);
    }
    else {
        camera.position.set( camera_posiotion[0], camera_posiotion[1], camera_posiotion[2] );
        //console.log(camera);
    }
    scene.add( camera );


    scene.add( new THREE.AmbientLight( 0xf0f0f0 ) );
    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 1500, 200 );
    light.castShadow = true;
    light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 70, 1, 200, 2000 ) );
    light.shadow.bias = -0.000222;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add( light );
    spotlight = light;



    var helper = new THREE.GridHelper( 2000, 100 );
    helper.material.color.set(gridcolor)
    helper.position.y = - 199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add( helper );



    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );



    // Controls
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.damping = 0.2;
    
    guishow = document.getElementById("d3").classList.contains("show");
    

    var gui = new dat.GUI();
    var flag = [1,1,1,1,1,1,1,1,1,1];
    
    gui.add(params,'DFS').onChange(function(){
        if(flag[1]){
            DFS(1);
        }else{
            saveCamera()
            init()
        }
        flag[1] = !flag[1];
    });
    gui.add(params,'BFS').onChange(function(){
        if(flag[2]){
            BFS(1);
        }else{
            saveCamera()
            init()
        }
        flag[2] = !flag[2];
    });
    gui.add(params,'Kruskal').onChange(function(){
        if(flag[3]){
            //prim(1);
            kruskal(1);
        }else{
            saveCamera()
            init()
        }
        flag[3] = !flag[3];
    });
    gui.add( params, 'Prim' ).onChange(function(){
        if(flag[0]){
            prim(1);
        }else{
            saveCamera()
            init()
        }
        flag[0] = !flag[0];
    });
    gui.add(params,'Dijkstra').onChange(function(){
        if(flag[4]){
            prim(1);
        }else{
            saveCamera()
            init()
        }
        flag[4] = !flag[4];
    });
    gui.add(params,'Floyd').onChange(function(){
        if(flag[5]){
            floyd();
        }else{
            saveCamera()
            init()
        }
        flag[5] = !flag[5];
    });
    gui.add(params,'SPFA').onChange(function(){
        if(flag[7]){
            SPFA(1);
        }else{
            saveCamera()
            init()
        }
        flag[7] = !flag[7];
    });
    gui.add(params,'SPFA_SLF').onChange(function(){
        if(flag[5]){
            SPFA_SLF(1);
        }else{
            saveCamera()
            init()
        }
        flag[8] = !flag[8];
    });
    gui.add(params,'SPFA_LLL').onChange(function(){
        if(flag[9]){
            SPFA_LLL(1);
        }else{
            saveCamera()
            init()
        }
        flag[9] = !flag[9];
    });
    

    gui.open();
    
    transformControl = new THREE.TransformControls( camera, renderer.domElement );
    transformControl.addEventListener( 'change', render );
    scene.add( transformControl );

    // Hiding transform situation is a little in a mess :()
    transformControl.addEventListener( 'change', function( e ) {

        cancelHideTransorm();

    } );

    transformControl.addEventListener( 'mouseDown', function( e ) {

        cancelHideTransorm();

    } );

    transformControl.addEventListener( 'mouseUp', function( e ) {

        delayHideTransform();

    } );



    var dragcontrols = new THREE.DragControls( splineHelperObjects, camera, renderer.domElement ); //
    dragcontrols.enabled = false;
    
    

    
    
    var hiding;

    function delayHideTransform() {

        cancelHideTransorm();
        hideTransform();

    }

    function hideTransform() {

        hiding = setTimeout( function() {

            transformControl.detach( transformControl.object );

        }, 2500 )

    }

    function cancelHideTransorm() {

        if ( hiding ) clearTimeout( hiding );

    }


    /*******
     * Curves
     *********/

    for ( var i = 0; i < splinePointsLength; i ++ ) {

        addSplineObject( positions[ i ] );

    }

    positions = [];

    for ( var i = 0; i < splinePointsLength; i ++ ) {

        positions.push( splineHelperObjects[ i ].position );

    }

    
    
   var vecs = [ new THREE.Vector3(x1,y3,0),
            new THREE.Vector3(x2,y5,0),
            new THREE.Vector3(x4,y5,0),
            new THREE.Vector3(x3,y4,0),
            new THREE.Vector3(x2,y3,0),
            new THREE.Vector3(x4,y3,0),
            new THREE.Vector3(x3,y2,0),
            new THREE.Vector3(x2,y1,0),
            new THREE.Vector3(x4,y1,0),
            new THREE.Vector3(x5,y3,0),
            new THREE.Vector3(x6,y3,0),
            new THREE.Vector3(x7,y5,0),
            new THREE.Vector3(x9,y5,0),
            new THREE.Vector3(x8,y4,0),
            new THREE.Vector3(x7,y3,0),
            new THREE.Vector3(x9,y3,0),
            new THREE.Vector3(x8,y2,0),
            new THREE.Vector3(x7,y1,0),
            new THREE.Vector3(x9,y1,0),
            new THREE.Vector3(x10,y3,0)
                ];             
    for(var i = 0;i<20;i++){
        for(var j=i+1;j<20;j++){
            if(adj[i][j]!=0){
                //line nodes
                var geometry = new THREE.Geometry();
                geometry.vertices.push( vecs[i] );
                geometry.vertices.push( vecs[j] );

                
                //line curve
                var curve = new THREE.CatmullRomCurve3( positions );
                curve.curveType = 'centripetal';
                curve.mesh = new THREE.Line( geometry, new THREE.LineDashedMaterial( {
                    color: line_color,
                    opacity: 1,
                    linewidth: 1000
                    } ) );
                curve.mesh.castShadow = true;
                ssplines.push(curve);
                
                //draw the line
                scene.add( curve.mesh );
                
                //add to node_lines
                node_lines[i].push(curve);
                node_lines[j].push(curve);
            }
        }
    }

    load(vecs);
                
}


function addSplineObject( position ) {

    var material = new THREE.MeshLambertMaterial( { color:"royalblue" } );
    var object = new THREE.Mesh( geometry, material );

    if ( position ) {

        object.position.copy( position );

    } else {

        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600;
        object.position.z = Math.random() * 800 - 400;

    }

    object.castShadow = true;
    object.receiveShadow = true;
    
    /************************************************************************************/
    nodes.push(object);
    /************************************************************************************/
    
    scene.add( object );
    splineHelperObjects.push( object );
    return object;

}

function addPoint() {

    splinePointsLength ++;

    positions.push( addSplineObject().position );

    updateSplineOutline();

}



function updateSplineOutline() {}



function load( new_positions ) {

    while ( new_positions.length > positions.length ) {

        addPoint();

    }

    while ( new_positions.length < positions.length ) {

        removePoint();

    }

    for ( var i = 0; i < positions.length; i ++ ) {

        positions[ i ].copy( new_positions[ i ] );

    }

    updateSplineOutline();

}

function animate() {

    requestAnimationFrame( animate );
    render();
    stats.update();
    transformControl.update();

}

function render() {

    //splines.uniform.mesh.visible = params.uniform;
    //splines.centripetal.mesh.visible = params.centripetal;
    //splines.chordal.mesh.visible = params.chordal;
    renderer.render( scene, camera );
}
            
function changeCircleColor(index,c,delay_,duration_){
    /**
    *   index:点的序号
    *   c:将变成的颜色
    *   delay_:延迟多少ms后，开始执行
    *   duration:动画执行的时间
    **/
    
    
    var timer = setTimeout ( function(){
        nodes[index].material.color.set(c);
    } , delay_ );
    times.push(timer);
    
}
            

function changeLineColor(i,j,c,delay_,duration_){
    /**
    *   i:一个点的index
    *   j:另一个点的index
    *   c:将变成的颜色
    *   delay_:延迟多少ms后，开始执行
    *   duration:动画执行的时间
    **/
    var timer = setTimeout ( function(){
        //点i所在的边 和 点j所在的边 的交集，（唯一），经由这条边到达
        var i_node_lines = node_lines[i];
        var j_node_lines = node_lines[j];
        for(var cur_i of i_node_lines){
            for(var pare_i of j_node_lines){
                if(cur_i === pare_i){
                    cur_i.mesh.material.color.set(c);
                    return;
                }
            }
        }
    } , delay_ );
    
    times.push(timer);
}
        
            
var adj2 =        [[0, 8, Infinity, Infinity, 6,    Infinity, Infinity, 7, Infinity, Infinity, Infinity,    Infinity, Infinity, Infinity, Infinity, Infinity,   Infinity, Infinity, Infinity, Infinity, Infinity],
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
            
            
         
//prim(0);
//kruskal(0);
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
                // E.push([i,j,adj[i][j]])
            }
        }
    }
    
    // console.log(E);
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
                // E.push([i,j,adj[i][j]])
            }
        }
    }
    
    // console.log(E);
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
                // changeCircleColor(a,circleFill,1000*time,500);
                // changeCircleColor(b,circleFill,1000*time,500);
                changeLineColor(a,b,line_color,delay2*time++,dura2,true);
                //console.log("两点已经在同一棵树中");
            }
        }
        if(edges.length==node_num){
            break;
        }


        
    }
    //console.log(edges)
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
    changeCircleColor(index, circleStart, delay1*time++, dura1);  //  先把初始点颜色改变

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
            //console.log(i+"fail");
            //console.log(nodes);
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
    changeCircleColor(index,circleStart,0,500)
	//根据深度，delay，改变颜色
    nodes.forEach(function(element,ii){
			
			if(color[ii] == 2&&ii!=index){
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

    changeCircleColor(index,circleStart,0,500)
	//根据深度，delay，改变颜色
    nodes.forEach(function(element,ii){
			
			if(color[ii] == 2&&ii!=index){
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
                
                changeLineColor(minIndex,i,line_color_temp,delay,100);
                delay = delay + delay_interupt;
                
                //relax
                if(d[i]>d[minIndex]+adj[i][minIndex]){
                    d[i] = d[minIndex] + adj[i][minIndex];
                    p[i] = minIndex; 
                }
                changeLineColor(minIndex,i,line_color_gone,delay,100);
                delay = delay + delay_interupt;
            }
        }
        
        
        
    }
    //console.log(d);
    //console.log(p);
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
    
    while(Q.length!=0){
        var now = Q.shift();//删掉头
        changeCircleColor(now,node_color_end,delay,100);
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
    console.log(d);
    console.log(p);
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
    
    while(Q.length!=0){
        var now = Q.shift();//删掉头
        
        changeCircleColor(now,node_color_end,delay,100);
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
    console.log(d);
    console.log(p);
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
                changeCircleColor(now,node_color_end,delay,100);
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
    console.log(d);
    console.log(p);
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