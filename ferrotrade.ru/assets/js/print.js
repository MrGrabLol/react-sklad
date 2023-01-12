function step1() {
    setTimeout('step2()', 10);
}

function step2() {
    window.print();
    window.close();
}

document.addEventListener("DOMContentLoaded", function(event) {
    let id = window.location.href.split('?')[1].split('=')[1];
    $("#code").attr("src", `${curHost}/api/code/${id}`);
    $.ajax({
        type: "GET",
        url: `${curHost}/api/position/${id}`,
        dataType: 'json',
        success: function (data, textStatus) {
            $("#manufacturer").html(data.manufacturer);
            $("#mark").html(data.mark);
            $("#diameter").html(data.diameter);
            $("#packing").html(data.packing);
            $("#part").html(data.part);
            $("#plav").html(data.plav);
            $("#mass").html(data.mass);
            $.ajax({
                type: "GET",
                url: `${curHost}/api/gost?mark=${data.mark}`,
                success: function (data, textStatus) {
                    console.log(data);
                    $("#gost").html(data);
                    step1();
                }
            })
        }
    });
});