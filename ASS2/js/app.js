var app = angular.module('myApp', ['ngRoute']);
const urlAPI = "http://localhost:3000/users";
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'subjectsCtrl'
        })
        .when('/subjects', {
            templateUrl: 'subjects.html',
            controller: 'subjectsCtrl'
        })
        .when('/gioithieu', {
            templateUrl: 'gioithieu.html',

        })
        .when('/lienhe', {
            templateUrl: 'lienhe.html',

        })
        .when('/gopy', {
            templateUrl: 'feedback.html',

        })
        .when('/quiz/:id/:name', {
            templateUrl: 'quiz-app.html',
            controller: 'quizsCtrl'

        })
        .when("/login", {
            templateUrl: "login.html",
            controller: ""
        })

});
app.controller("myProfile", function ($scope, $http, $rootScope) {
    $scope.dangKy = {};
    $scope.dmk = {};
    $scope.mkMoi = {};
    $scope.login = {};
    $scope.profile = {};
    $rootScope.users = [];
    $scope.doiMatKhau = {};
    // $http.get để lấy danh sách người dùng từ một API được truyền vào biến urlAPI và lưu kết quả trả về  $rootScope.users
    $http.get(urlAPI).then(function (reponse) {
        $rootScope.users = reponse.data;
    });
    $scope.login = function () {
        var check = false;
        for (let i = 0; i < $rootScope.users.length; i++) {
            if (
                $rootScope.users[i].username == $scope.login.username &&
                $rootScope.users[i].password == $scope.login.password
            ) {
                check = true;
                $rootScope.user = $rootScope.users[i].username;
                $rootScope.tenNguoiDung = $rootScope.users[i].fullname;
                $rootScope.email = $rootScope.users[i].email;
                $rootScope.gender = $rootScope.users[i].gender;
                $rootScope.birthday = $rootScope.users[i].birthday;

            }
        }

        if (check) {
            $rootScope.check = true;
            localStorage.setItem("fullname", $rootScope.tenNguoiDung);
            localStorage.setItem("user", JSON.stringify($rootScope.users));
            Swal.fire({
                icon: "warning",
                title: "Đăng nhập thành công",
                text: "Chuyển hướng đến trang chủ!",
                   showConfirmButton: false,
                 timer: 1000,
            });
            $('#dangNhap').modal('hide');
            window.location.href = "#/";
        } else {
            $rootScope.check = false;
            Swal.fire({
                icon: "",
                title: "Đăng nhập thất bại",
                text: "Vui lòng kiểm tra lại!",
            });
        }
    };

    $scope.signUp = function () {
        $scope.check = false;
        $scope.password2;
       
        if (!$scope.dangKy.username || !$scope.dangKy.password || !$scope.password2 || !$scope.dangKy.fullname || !$scope.dangKy.email) {
            Swal.fire({
                icon: "error",
                title: "Lỗi đăng ký",
                text: "Vui lòng nhập đầy đủ thông tin!",
            });
            return;
        }
        for (let i = 0; i < $rootScope.users.length; i++) {
            if ($rootScope.users[i].username == $scope.dangKy.username) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi đăng ký",
                    text: "Tên đăng nhập đã tồn tại!",
                });
                return;
            }
        }    
        if ($scope.dangKy.password == $scope.password2) {
            $scope.check = true;
            $http.post(urlAPI, $scope.dangKy).then(function (response) {
                $scope.users.push(response.data);
            });
        }
        if ($scope.check) {
            Swal.fire({
                icon: "success",
                title: "Đăng ký thành công",
                text: "Chuyển hướng đến trang chủ!",
                showConfirmButton: false,
                timer: 1000,
            });
            // $('#dangKy').modal('hide');
            // window.location.href ="#!dangNhap";
        } else {
            Swal.fire({
                icon: "error",
                title: "Đăng ký thất bại",
                text: "Mật khẩu không chính xác!",
            });
        }
    };
        $scope.update = function() {
                    // $rootScope.users[$rootScope.indexStudents] = angular.copy($rootScope.user);
                    Swal.fire({
                        icon: 'success',
                        title: 'Cập nhật thông tin cá nhân thành công!',
                    });
                    $('#taiKhoan').modal('hide');
                    window.location.href = "#/";
        }
      
    
    // Quên mật khẩu
    $scope.quenMatKhau = function () {
        $scope.check = false;
        $scope.index = 0;
        for (var i = 0; i < $scope.users.length; i++) {
            if ($scope.email == $scope.users[i].email) {
                $scope.check = true;
                $scope.index = i;
            }
        }
        if ($scope.check) {
            $scope.qmk = "Mật khẩu của bạn là: " + $scope.users[$scope.index].password;
        } else {
            $scope.qmk = "Bạn nhập sai email!";
        }
    };
   
//     $scope.doiMatKhau = {};
// $scope.changePassword = function() {
//     var check = false;
//     for (let i = 0; i < $rootScope.users.length; i++) {
//         if ($rootScope.users[i].username == $rootScope.user && $rootScope.users[i].password == $scope.dmk.password1) {
//             check = true;
//             $rootScope.users[i].password = $scope.mkMoi.password;
//             localStorage.setItem("user", JSON.stringify($rootScope.users));
//             $http({
//                 method: "PUT",
//                 url: urlAPI + "/" + $scope.users.id,
//                 data: {
//                     username: $scope.user.username,
//                     password: $scope.mkMoi.password
//                 }
//             }).then(function (response) {
//                 $scope.users = response.data;
//                 // Thông báo thành công
//                 Swal.fire({
//                     icon: "success",
//                     title: "Đổi mật khẩu thành công",
//                     text: "Mật khẩu đã được thay đổi!",
//                 });
//                 // Đóng modal đổi mật khẩu
//                 $("#doiMatKhau").modal("hide");
//             });
//             // Swal.fire({
//             //     icon: "success",
//             //     title: "Đổi mật khẩu thành công",
//             //     text: "Mật khẩu của bạn đã được thay đổi",
//             //     showConfirmButton: false,
//             //     timer: 1000,
//             // });
//             // break;
//         }
//     }
    
//     if (!check) {
//         Swal.fire({
//             icon: "error",
//             title: "Đổi mật khẩu thất bại",
//             text: "Mật khẩu cũ không chính xác!",
//         });
//     }
// }
    $scope.dangXuat = function () {
        $rootScope.user = null;
        localStorage.clear();
        window.location.reload();
        Swal.fire({
            icon: "success",
            title: "Đăng xuất thành công!",
            text: "Chuyển hướng đến trang chủ!",
            showConfirmButton: false,
            timer: 1000,
        });
    };
});

app.controller('quizsCtrl', function ($scope, $http, $routeParams, quizFactory) {

    $http.get('/ASS2/db/Quizs/' + $routeParams.id + '.js').then(function (res) {
        // $scope.list_subject= res.data;
        //dữ liệu được gán vào biến res và trả về quizFactory.questions
        quizFactory.questions = res.data;
    });
});

//  môn học
app.controller('subjectsCtrl', function ($scope, $http) {
    $scope.pageSize = 4;
    $scope.start = 0;
    $scope.list_subject = [];
    $http.get('/ASS2/db/Subjects.js').then(function (res) {
        $scope.list_subject = res.data;
    });
    $scope.prev = function () {
        if ($scope.start > 0) {
            $scope.start -= $scope.pageSize;
        }
    }
    // Sau
    $scope.next = function () {
        if ($scope.start < $scope.list_subject.length - $scope.pageSize) {
            $scope.start += $scope.pageSize;
        }
    }
    $scope.all = function () {
         $scope.pageSize=$scope.list_subject.all;
    }
   
});


app.directive('quizfpoly', function (quizFactory, $routeParams,$rootScope) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'template-quiz.html',
        link: function (scope, elem, attrs) {
          
            scope.start = function () {
                if ($rootScope.user == null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Bạn chưa đăng nhập!',
                        text: 'Vui lòng đăng nhập để bắt đầu thi !!!'
                    });

                }else {
                    Swal.fire({
                        title: 'Bắt đầu thi?',
                        text: "Bạn đã sẳn sàng làm bài!",
                        icon: 'success', 
                    });
                   //Sau đó, nó gọi phương thức getQuestions() của quizFactory để lấy các câu hỏi, 
                   //đặt inProgess = true để hiển thị kiểm tra đang được thực hiện, 
                   //đặt quizOver = false để cho biết kiểm tra chưa kết thúc.
                    quizFactory.getQuestions().then(function () {
                        scope.subjectName = $routeParams.name;
                        scope.id = 1;
                        scope.inProgess = true;
                        scope.getQuestion();
                        scope.quizOver = false; //chưa xong
                });
                

            }
            };
            
            scope.reset = function () {
                scope.inProgess = false;//hiển thị trang thái đang làm bài hay chưa làm bài
                scope.score = 0;
            };
            
            scope.getQuestion = function () {
                var quiz = quizFactory.getQuestion(scope.id);//để lấy câu hỏi, dựa trên ID của câu hỏi được lưu trong biến scope.id
                if (quiz) {
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;//chứa danh sách các phương án trả lời,
                    scope.answer = quiz.AnswerId;//chứa id của phương án đúng
                    scope.answerMode = true;
                } else {
                    scope.quizOver = true;
                }



            }
            scope.checkAnswer = function () {
                // alert('answer');
                //Kiểm tra xem người dùng đã chọn câu trả lời hay chưa
                //Nếu chưa, không làm gì cả.
                if (!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                if (ans == scope.answer) {
                    // alert('Đúng');
                    scope.score++;
                    scope.correctAns = true;
                } else {
                    // alert('Sai');
                    scope.correctAns = false;
                }
                scope.answerMode = false;
            };
            //tăng giá trị $scope.id lên 1 và gọi hàm getQuestion() để lấy câu hỏi tiếp theo.
            scope.nextQuestion = function () {
                scope.id++;
                scope.getQuestion();
            }
            scope.reset();
        }
    }

});
app.factory('quizFactory', function ($http, $routeParams) {

    return {
        getQuestions: function () {
            return $http.get('/ASS2/db/Quizs/' + $routeParams.id + '.js').then(function (res) {

                questions = res.data;
                //  alert(questions.length);
            });
        },
        getQuestion: function (id) {
            var ramdomItem = questions[Math.floor(Math.random() * questions.length)];
            var count = questions.length;
            if (count > 10) {
                count = 10;
            }
            if (id <= count) {
                return ramdomItem;
            } else {
                return false;
            }

        }
    }
});
app.controller('myCtrl', function ($scope, $interval) {
    var stop;
    $scope.time = new Date();
    $scope.minutes = 10;
    $scope.seconds = 0;
   

    function countDown() {
       
        if ($scope.seconds == 0) {
            if ($scope.minutes == 0) {
                return;
            } else {
                $scope.minutes--;
                $scope.seconds = 59;
            }
        } else {
            $scope.seconds--;
          
        }
       
       
    }

    stop = $interval(function () {
        $scope.time = new Date();
        countDown();
        
        // 
       
        
      
    }, 1000);
});