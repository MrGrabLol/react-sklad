function change_property(elem) {
    $("#new-property").text($(elem).text());
}

function add_property() {
    property = $("#new-property");
    value = $("#new-property-value");
    addedProps = $("#added-properties");
    newProp = `<div class="row col-12 my-1 added-property">
                    <button type="button" class="btn btn-outline-secondary delete-property p-1 col-2" id="delete-property" onclick="delete_property(this)">
                        Удалить
                    </button>
                    <div class="row col-5 m-1 property-key">
                        ${property.text()}
                    </div>
                    <div class="col m-1 property-value">
                        ${value.val()}
                    </div>
                </div>`;
    addedProps.html(addedProps.html() + newProp);
}

function delete_property(elem) {
    $(elem).parent().remove();
}

function help_mark() {
    let tags = [];
    let input = $("#mark").val();
    $.ajax({
        type: 'POST',
        async: false,
        url: `${curHost}/api/search/marks/tags?mark=${input}`,
        dataType: 'json',
        success: function (data, textStatus) {
            tags = data;
        }
    })
    $("#mark").autocomplete({
        source: tags
    });
}

function submit_mark() {
    mark = $("#mark");
    diameter = $("#diameter");
    mark.attr("value", mark.val());
    diameter.attr("value", diameter.val());
    console.log(mark);
    certForm = $(".certificateForm");
    $.ajax({
        type: 'GET',
        async: false,
        url: `http://ferro-trade.ru:7000/docGenerator/certificate/gost?mark=${mark.val()}`,
        dataType: 'json',
        success: function (data, textStatus) {
            gosts = data;
            gost = `<div class="row col-12 my-1">
                        <div class="col-2 my-1">ГОСТ</div>
                        <div class="col-5">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" id="dropdown-gosts" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    ГОСТ
                                </button>
                                <div class="dropdown-menu" id="dropdown-menu-gosts" aria-labelledby="dropdownMenuButton"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row col-12 my-1">
                        <div class="col-2 my-1">
                            Плавка
                        </div>
                        <div class="col-5">
                            <input type="text" class="form-control ui-autocomplete-input" id="plav">
                        </div>
                    </div>`;
            dropdown = "";
            gosts.forEach(function (elem) {
                dropdown += `<a class="dropdown-item" href="#" onclick="$('#dropdown-gosts').text($(this).text());">${elem}</a>`;
            })
            certForm.html(certForm.html() + gost);
            $("#dropdown-menu-gosts").html(dropdown);
            btn = $("#submit-mark");
            btn.attr('id', 'submit-plav');
            btn.off('click');
            btn.on('click', submit_plav);
        },
        error: function (data, textStatus) {
            gosts = ["Проволка стальная сварочная ГОСТ 2246-70","Проволока из высоколегированной корозионостойкой и жаростойкой стали ГОСТ 18143-72","Проволока стальная наплавочная ГОСТ 10543-98","Проволока стальная сварочная ТУ 14-1-1959-77","Проволока стальная сварочная ТУ 14-1-1383-75","Проволока стальная сварочная ТУ 1227-027-61668841-2020","ТУ 14-1-2416-78","ТУ 14-4345-2017","ТУ 14-1-2989-80","ТУ 14-1-2921-80","ТУ 5.965-11610-96","ТУ 14-1-1549-2015","ТУ 14-1-1392-75"];
            gost = `<div class="row col-12 my-1">
                <div class="col-2 my-1">ГОСТ</div>
                <div class="col-5">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" id="dropdown-gosts" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ГОСТ
                        </button>
                        <div class="dropdown-menu" id="dropdown-menu-gosts" aria-labelledby="dropdownMenuButton"></div>
                    </div>
                </div>
            </div>
            <div class="row col-12 my-1">
                <div class="col-2 my-1">
                    Плавка
                </div>
                <div class="col-5">
                    <input type="text" class="form-control ui-autocomplete-input" id="plav">
                </div>
            </div>`;
            dropdown = "";
            gosts.forEach(function (elem) {
                dropdown += `<a class="dropdown-item" href="#" onclick="$('#dropdown-gosts').text($(this).text());">${elem}</a>`;
            });
            certForm.html(certForm.html() + gost);
            $("#dropdown-menu-gosts").html(dropdown);
            btn = $("#submit-mark");
            btn.attr('id', 'submit-plav');
            btn.off('click');
            btn.on('click', submit_plav);
        }
    })
}

function submit_plav() {
    plav = $("#plav");
    plav.attr('value', plav.val());
    certForm = $(".certificateForm");
    $.ajax({
        type: "GET",
        url: `http://ferro-trade.ru:7000/chemistry/${plav.val()}`,
        dataType: 'json',
        success: function (data, textStatus) {
            tbody = '<div class="table-responsive" id="chemistry-table"><table class="table w-auto" id="plav-table"><tbody><tr>';
            values = '';
            data.elements.forEach(function (elem) {
                tbody += `<th>${elem.name}</th>`;
                values += `<td>${elem.value}</td>`;
            })
            tbody += `</tr><tr>${values}</tr></table></div>
                        <div class="row col-12 my-1">
                            <div class="col-2">
                                Партия
                            </div>
                            <div class="col-5">
                                <input type="text" class="form-control ui-autocomplete-input" id="part-number">
                            </div>
                        </div>
                        <div class="col part-properties">
                        <div class="col" id="added-properties"></div>
                            <div class="input-group m-1">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn btn-outline-secondary add-property" id="add-property" onclick="add_property()" style="border-radius: 5px 0 0 5px">
                                        Добавить
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="new-property">
                                        Временное сопротивление разрыву, Н/мм<sup>2</sup>(МПа)
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Временное сопротивление разрыву, Н/мм<sup>2</sup>(МПа)
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Число перегибов на 180&deg;
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Испытание на МКК, Метод/Результат
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Относительное удлинение, %
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Содержание ферритной фазы, %
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Состояние поверхности
                                        </a>
                                    </div>
                                </div>
                                <input type="text new-property-value" class="form-control" id="new-property-value">
                            </div>
                        </div>`;
            certForm.html(certForm.html() + tbody);
            btn = $("#submit-plav");
            btn.attr('id', 'submit-part');
            btn.off('click');
            btn.on('click', submit_part);
        },
        error: function (data, textStatus) {
            table = `<div class="table-responsive">
                            <table class="table w-auto">
                                <tbody>
                                <tr>
                                    <th>C</th>
                                    <th>Mn</th>
                                    <th>Si</th>
                                    <th>S</th>
                                    <th>P</th>
                                    <th>Cr</th>
                                    <th>Ni</th>
                                    <th>Cu</th>
                                </tr>
                                <tr>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                </tr>
                                <tr>
                                    <th>Ti</th>
                                    <th>Mo</th>
                                    <th>V</th>
                                    <th>N</th>
                                    <th>Al</th>
                                    <th>Nb</th>
                                    <th>W</th>
                                    <th>As</th>
                                </tr>
                                <tr>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                </tr>
                                <tr>
                                    <th>Co</th>
                                    <th>Fe</th>  
                                </tr>
                                <tr>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                    <th><input type="text" class="form-control chemistry-value"></th>
                                </tr>
                                </tbody>
                            </table>
                        </div>`;
            certForm.html(certForm.html() + table);
            btn = $("#submit-plav");
            btn.attr('id', 'save-plav');
            btn.off('click');
            btn.on('click', save_plav);
        }
    })
}

function submit_part() {
    partNum = $("#part-number").val();
    properties = [];
    $(".added-property").each(function() {
        properties.push({
            "name": $(this).find(".property-key").text().trim(),
            "value": $(this).find(".property-value").text().trim()
        })
    });
    part = {
        "partId": partNum,
        "parameters": properties
    }
    if ($(".chemistry-value").length > 0) {
        chemValues = [];
        $(".chemistry-value").each(function () {
            chemValues.push($(this).val());
        })
        chems = ["C", "Mn", "Si", "S", "P", "Cr", "Ni", "Cu", "Ti", "Mo", "V", "N", "Al", "Nb", "W", "As", "Co", "F"];
        chemDict = {
            "plavId": $("#plav").val(),
            "elements": []
        };
        for (i = 0; i < chemValues.length; i++) {
            chemDict.elements.push({
                "name": chems[i],
                "value": chemValues[i]
            });
        }
    } else {
        $.ajax({
            type: "GET",
            async: false,
            url: `http://ferro-trade.ru:7000/chemistry/${$("#plav").val()}`,
            dataType: 'json',
            success: function (data, textStatus) {
                chemDict = data;
            }
        });
    }
    obj = {
        "mark": $("#mark").val(),
        "diameter": $("#diameter").val(),
        "packing": $("#dropdown-packings").text().trim(),
        "gost": $("#dropdown-gosts").text().trim(),
        "plav": chemDict,
        "part": part
    }
    $.ajax({
        type: "POST",
        url: "http://ferro-trade.ru:7000/docGenerator/certificate",
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function (data, textStatus) {
            console.log(data);
            window.open(`http://ferro-trade.ru:7000${data.replaceAll('/', '|')}`, "_blank");
        },
        error: function (data, textStatus) {
            console.log(data);
        }
    })
    console.log(obj);
}

function save_plav() {
    certForm = $(".certificateForm");
    chemValues = [];
    $(".chemistry-value").each(function () {
        chemValues.push($(this).val());
        $(this).attr("value", `${$(this).val()}`);
    })
    chems = ["C", "Mn", "Si", "S", "P", "Cr", "Ni", "Cu", "Ti", "Mo", "V", "N", "Al", "Nb", "W", "As", "Co", "F"];
    chemDict = {
        "plavId": $("#plav").val(),
        "elements": []
    };
    for (i = 0; i < chemValues.length; i++) {
        chemDict.elements.push({
            "name": chems[i],
            "value": chemValues[i]
        });
    }
    console.log(chemDict);
    certForm.html(certForm.html() + `
                        <div class="row col-12 my-1">
                            <div class="col-2 my-1">
                                Партия
                            </div>
                            <div class="col-5">
                                <input type="text" class="form-control ui-autocomplete-input" id="part-number">
                            </div>
                        </div>
                        <div class="col part-properties">
                        <div class="col" id="added-properties"></div>
                            <div class="input-group m-1">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn btn-outline-secondary add-property" id="add-property" onclick="add_property()" style="border-radius: 5px 0 0 5px">
                                        Добавить
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="new-property">
                                        Временное сопротивление разрыву, Н/мм<sup>2</sup>(МПа)
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Временное сопротивление разрыву, Н/мм<sup>2</sup>(МПа)
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Число перегибов на 180&deg;
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Испытание на МКК, Метод/Результат
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Относительное удлинение, %
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Содержание ферритной фазы, %
                                        </a>
                                        <a class="dropdown-item" onclick="change_property(this)" href="#">
                                            Состояние поверхности
                                        </a>
                                    </div>
                                </div>
                                <input type="text new-property-value" class="form-control" id="new-property-value">
                            </div>
                        </div>`)
    btn = $("#save-plav");
    btn.attr('id', 'submit-part');
    btn.off('click');
    btn.on('click', submit_part);
}

function new_form() {
    certForm = `<div class="col-md-12">
                <h5 class="text-center row"><div class="col-12">Форма</div>
                </h5>
                <form class="certificateForm" name="certificateForm">
                        <div class="row col-12 my-1"><div class="col-2 my-1">Марка</div><div class="col-5"><input type="text" class="form-control ui-autocomplete-input" id="mark" oninput="help_mark()"></div></div>
                        <div class="row col-12 my-1"><div class="col-2 my-1">Диаметр</div><div class="col-5"><input type="text" class="form-control ui-autocomplete-input" id="diameter"></div></div>
                        <div class="row col-12 my-1">
                            <div class="col-2 my-1">Упаковка</div>
                            <div class="col-5">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-packings" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Моток
                                    </button>
                                    <div class="dropdown-menu" id="dropdown-menu-packings" aria-labelledby="dropdownMenuButton"></div>
                                </div>
                            </div>
                        </div>
                </form>
                <button class="btn btn-outline-success btn-block mt-2" id="submit-mark" type="button">
                    Дальше
                </button>
            </div>`;
    $.ajax({
        type: 'GET',
        url: `${curHost}/api/packings`,
        dataType: 'json',
        success: function (data, textStatus) {
            packings = data;
            dropdown = "";
            packings.forEach(function (packing) {
                dropdown += `<a class="dropdown-item" href="#" onclick="$('#dropdown-packings').text($(this).text());">${packing}</a>`;
            })
            $(".certificate-form").html(certForm);
            $("#dropdown-menu-packings").html(dropdown);
            $("#submit-mark").on("click", submit_mark);
        }
    });
}

$(document).ready(function () {
    new_form();
})