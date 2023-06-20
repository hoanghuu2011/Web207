
var app = angular.module("myApp", []);
app.controller("Ctrl", function ($scope) {
    $scope.$parent.student={};
    $scope.index=-1;
    //lưu
    $scope.save=function(){
        $scope.sv.push(angular.copy($scope.student));
    }
    //mới
    $scope.clear=function(){
        $scope.student= {};
        $scope.index = -1;
    }
    //sửa
    $scope.edit=function(index){
         $scope.index =index;
         $scope.student=angular.copy($scope.sv[index]);
    }
    //cập nhập
    $scope.update =function(){
      $scope.sv[$scope.index] = angular.copy($scope.student);
      $scope.clear();  
    }
    //xóa
    $scope.delete = function(){
        $scope.sv.splice($scope.index,1)
        $scope.clear();
    }
    //cancel
    $scope.cancel = function(){
        if($scope.index ==-1){
            $scope.clear();
        }else{
            $scope.edit($scope.index);
        }
    }
    //listsinhvien
    $scope.sv = [
    {
    fullname: "Võ Văn Hoàng Hữu",
    birthday: "20-11-2003",
    marks: "10",
},  
{
    fullname: "Nguyễn Thị Linh Hương",
    birthday: "11-11-2003",
    marks: "9",
},
{
    fullname: "Nguyễn Văn A",
    birthday: "1-1-2000",
    marks: "8",
},
{
    fullname: "Trương Thanh Hồng",
    birthday: "15-1-2003",
    marks: "10",
},  
{
    fullname: "Đoàn Ngọc Quốc Việt",
    birthday: "12-12-2003",
    marks: "10",
},  
{
    fullname: "Võ Thị Hoàng Quý",
    birthday: "4-3-2003",
    marks: "10",
}  
] 
});
