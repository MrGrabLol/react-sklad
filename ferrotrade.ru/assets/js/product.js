function ImagetoPrint(source, id) {
    str = '';
    $.ajax({
        type: 'GET',
        url: `${curHost}/api/position/${id}`,
        dataType: 'json',
        async: false,
        success: function (data, textStatus) {
            console.log(data.mark);
            mark = data.mark.replaceAll('–', '-');
            gost = '';
            $.ajax({
                type: 'GET',
                url: `${curHost}/api/gost?mark=${mark}`,
                async: false,
                success: function (data, textStatus) {
                    gost = data;
                },
                error: function (data, textStatus) {
                    console.log(data);
                }
            })
            str = "<html><title>Штрих-код</title><head><scri" +
                "pt>function step1(){\n" +
                "setTimeout('step2()', 10);}\n" +
                "function step2(){window.print();window.close()}\n" +
                "</script></head>" + "<body onload='step1()'>\n" +
                "<img width='280' height='100' style='margin: auto;' src='" + source + `' />
            <p style='font-size: 20px; margin: 0'>Производитель: ${data.manufacturer}</p>
            <p style='font-size: 20px; margin: 0'>Марка: ${data.mark}</p>
            <p style='font-size: 20px; margin: 0'>${gost}</p>
            <p style='font-size: 20px; margin: 0'>Диаметр: ${data.diameter}</p>
            <p style='font-size: 20px; margin: 0'>Вид поставки: ${data.packing}</p>
            <p style='font-size: 20px; margin: 0'>Партия: ${data.part}</p>
            <p style='font-size: 20px; margin: 0'>Плавка: ${data.plav}</p>
            <p style='font-size: 20px; margin: 0'>Масса: ${data.mass.toFixed(2)}       ОТК1</p>
            
            
</body></html>`;
            console.log(str);
        }
    })
    console.log(str);
    return str;
}

function PrintImage(id) {
    let source = `${curHost}/api/code/${id}`;
    let Pagelink = "about:blank";
    let pwa = window.open(Pagelink, "_new");
    pwa.document.open();
    pwa.document.write(ImagetoPrint(source, id));
    pwa.document.close();
}

$(document).ready(function () {
    console.log(window.location.href.split('?')[1].split('=')[1]);
    id = window.location.href.split('?')[1].split('=')[1];
    $.ajax(
        {
            type: 'GET',
            url: `${curHost}/api/position/${id}`,
            dataType: 'json',
            success: function (data, textStatus) {
                if (data.status === 'Departured') {
                    status = 'Отгружен';
                    // $('#shipment').hide();
                } else if (data.status === 'In_stock') {
                    status = 'На складе';
                    $("#shipment").removeClass('d-none');
                } else if (data.status === 'Arriving') {
                    status = 'Прибывает';
                    $("#shipment").removeClass('d-none');
                }
                table = `
                    <table class="table">
                    <tbody>
                        <tr>
                        <th>Марка</th>
                        <td>${data.mark}</td>
                        </tr>

                        <tr>
                        <th scope="row">Диаметр</th>
                        <td>${data.diameter}</td>
                        </tr>

                        <tr>
                        <th scope="row">Упаковка</th>
                        <td>${data.packing}</td>
                        </tr>

                        <tr>
                        <th scope="row">Партия</th>
                        <td>${data.part}</td>
                        </tr>

                        <tr>
                        <th scope="row">Плавка</th>
                        <td>${data.plav}</td>
                        </tr>

                        <tr>
                        <th scope="row">Вес</th>
                        <td id="productMass">${data.mass}</td>
                        </tr>

                        <tr>
                        <th scope="row">Статус</th>
                        <td>${status}</td>
                        </tr>

                        <tr>
                        <th scope="row">Производитель</th>
                        <td>${data.manufacturer}</td>
                        </tr>`;
                if (data.comment != null && data.comment !== "") {
                    table += `
                        <tr>
                        <th scope="row">Комментарий</th>
                        <td>${data.comment}</td>
                        </tr>`;
                }
                if (data.createdFrom <= 0) {
                    $('.info').html(table + `</tbody></table>`);
                } else {
                    $('.info').html(table + `</tbody></table>
                        <p>Был в составе <a href="product.html?id=${data.createdFrom}">этого продукта</a></p>`);
                }
                $.ajax({
                        type: "GET",
                        url: `http://ferro-trade.ru:7000/chemistry/${data.plav}`,
                        dataType: 'json',
                        success: function (data, textStatus) {
                            table = `
                                <div class="table-responsive">
                                <table class="table w-auto">
                                <tbody>
                                <tr>
                                Химический состав
                                </tr>
                                <tr>`;
                            values = '';
                            data.elements.forEach(function (chem) {
                                table += `<th>${chem.name}</th>`;
                                values += `<td>${chem.value}</td>`;
                            })
                            table += "</tr><tr>" + values + `</tr></tbody></table></div>`;
                            $(".chemistry").html(table);
                        }
                    }
                );
                const body = {
                    'part' : data.part
                }
                $.ajax({
                    type: "POST",
                    url: `http://ferro-trade.ru:7000/mech`,
                    contentType: 'application/json',
                    data: JSON.stringify(body),
                    dataType: 'json',
                    success: function (data, textStatus) {
                        console.log(data);
                        certBtn = $("#open-cert");
                        certBtn.removeClass("d-none");
                        certBtn.on("click", function() {
                            open_cert(data.partId);
                        });
                        table = `<table class="table w-auto"><tbody><tr>`;
                        values = '';
                        data.parameters.forEach(function (param) {
                            table += `<th>${param.name}</th>`;
                            values += `<td>${param.value}</td>`;
                        });
                        table += "</tr><tr>" + values + "</tr></body></table>";
                        $(".part-properties").html(table);
                    }
                })
            }
        }
    );
    $.ajax(
        {
            type: "GET",
            url: `${curHost}/api/history/allById/${id}`,
            dataType: 'json',
            success: function (data, textStatus) {
                console.log(data);
                table = `
                <table class="table">
                <tbody>
                <tr>
                <th>#</th>
                <th>Тип</th>
                <th>Дата</th>
                <th>Место</th>
                <th>Работник</th>
                </tr>`;
                for (i = 0; i < data.length; i++) {
                    type = data[i].type
                    place = data[i].place
                    if (data[i].type === 'ADDING')
                        type = 'Добавление'
                    else if (data[i].type === 'OTGRUZKA')
                        type = 'Отгрузка'
                    if (data[i].place === 'SOLNECHNOGORSK')
                        place = 'Солнечногорск'
                    else if (data[i].place === 'BELORETSK_PROIZVODSTVO')
                        place = 'Белорецк'
                    worker = data[i].user
                    table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${type}</td>
                    <td>${data[i].date}</td>
                    <td>${place}</td>
                    <td>${worker}</td>
                    </tr>`;
                }
                table += '</tbody></table>';
                $(".history").html(table);
            },
            error: function (data, textStatus) {
                console.log(data);
            }
        }
    );
})

function open_cert(id) {
    window.open(`http://ferro-trade.ru:7000/docGenerator/certificate/getZero/${id}`, '_blank')
}

$('#controlBtns').delegate('#print', 'click', function () {
    console.log("print");
    id = window.location.href.split('?')[1].split('=')[1];
    PrintImage(id);
})

$("#controlBtns").delegate("#print-with-logo", "click", function () {
    console.log("logo");
    id = window.location.href.split('?')[1].split('=')[1];
    window.open(`${curHost}/print?id=${id}`);
})

$('#controlBtns').delegate('#shipment', 'click', function () {
    $('.shipm-form').css('display', 'inline');
})

$('.shipm-form').delegate('.close-block', 'click', function () {
    $('.shipm-form').fadeOut();
    $("#ship").css('display', 'inline');
    $("#printDeparted").css('display', 'none');
})

$('.shipm-form').delegate('#ship', 'click', function () {
    $("#ship").prop("disabled", true);
    id = window.location.href.split('?')[1].split('=')[1];
    input = document.forms.shipmentForm.mass.value.replaceAll(",", ".");
    contrAgent = document.forms.shipmentForm.contrAgent.value;
    account = parseInt(document.forms.shipmentForm.account.value, 10);
    console.log(input);
    mass = parseFloat(input);
    data = {
        'id': id,
        'weight': mass
    }
    obj = {
        data,
        'contrAgent': contrAgent,
        'account': account
    }
    console.log(`${curHost}/api/position/departure?id=${id}&weight=${mass}&contrAgent=${contrAgent}&account=${account}`);
    if (isNaN(mass)) {
        console.log('error');
        $('.error').fadeIn();
        setTimeout(function () {
            $('.error').fadeOut();
        }, 2000);
        $("#ship").prop("disabled", false);
    } else {
        $.ajax({
            type: 'POST',
            url: `${curHost}/api/position/departure`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: 'json',
            success: function (data, textStatus) {
                $("#ship").replaceWith(
                    `<button class="btn btn-outline-success btn-block mt-2" id="printDeparted">Распечатать новый код</button>`);
                productMass = $("#productMass");
                curMass = parseFloat(productMass.text());
                productMass.html(curMass - mass);
                $(".shipm-form").delegate('#printDeparted', 'click', function (){
                    PrintImage(data);
                    $(".shipm-form").fadeOut();
                    $("#printDeparted").replaceWith(
                        `<button class="btn btn-outline-success btn-block mt-2" id="ship">Отгрузить</button>`);
                    $("#ship").prop("disabled", false);
                })
            }
        })
    }
})