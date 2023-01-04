//引入exceljs
const Excel = require('exceljs');
 // 导出excel
    downloadExcel = () => {
        let dataLength = 0;
        this.state.dataItems.forEach(floor => {
            floor.rooms.forEach(room => {
                dataLength += room.devices ? room.devices.length : 0
                dataLength += room.pipes ? room.pipes.length : 0
                dataLength += room.joints ? room.joints.length : 0
                dataLength += room.hangers ? room.hangers.length : 0
                dataLength += room.insulationPipes ? room.insulationPipes.length : 0
                dataLength += room.staples ? room.staples.length : 0
                dataLength += room.holes ? room.holes.length : 0
            })
        });
        this.state.percent = 0;
        this.progressGaga(true)

        //cell style
        var fills = {
            solid: { type: "pattern", pattern: "solid", color: { argb: 'FFFFFFFF' }, fgColor: { argb: "FF1890FF" }, height: 40 }
        };
        //create a workbook
        var workbook = new Excel.Workbook();
        //add header
        var ws1 = workbook.addWorksheet(this.getPageTitle());
        // 表头
        ws1.columns = this.state.columns;
        // 表头样式
        ws1.getCell("A1").fill = fills.solid;
        ws1.getCell("B1").fill = fills.solid;
        ws1.getCell("C1").fill = fills.solid;
        ws1.getCell("D1").fill = fills.solid;
        ws1.getCell("E1").fill = fills.solid;
        ws1.getCell("F1").fill = fills.solid;
        ws1.getCell("G1").fill = fills.solid;
        ws1.getCell("H1").fill = fills.solid;
        ws1.getCell("I1").fill = fills.solid;
        ws1.getCell("J1").fill = fills.solid;
        ws1.getCell("K1").fill = fills.solid;
        ws1.getCell("L1").fill = fills.solid;
        ws1.getCell("M1").fill = fills.solid;
        ws1.getCell("N1").fill = fills.solid;
        ws1.getCell("O1").fill = fills.solid;
        // 第一行
        var count = 0;
        var allFloorPromse = Promise.resolve();
        var floorPromise = [];
        var allFloors = [];
        var allRooms = [];
        var floorStart = 0;
        var roomStart = 0;
        this.state.dataItems.forEach((floor, index) => {
            let floorCont = 0
            floor.rooms && floor.rooms.length > 0 && floor.rooms.forEach(data => {
                floorCont += data.devices ? data.devices.length : 0
                floorCont += data.pipes ? data.pipes.length : 0
                floorCont += data.joints ? data.joints.length : 0
                floorCont += data.hangers ? data.hangers.length : 0
                floorCont += data.insulationPipes ? data.insulationPipes.length : 0
                floorCont += data.staples ? data.staples.length : 0
                floorCont += data.wireses ? data.wireses.length : 0
                floorCont += data.wirewes ? data.wirewes.length : 0
                floorCont += data.textures ? data.textures.length : 0
                floorCont += data.holes ? data.holes.length : 0
            })
            allFloors.push({
                startLine: floorStart === 0 ? 2 : floorStart + 1,
                endLine: floorCont + (floorStart === 0 ? floorStart + 1 : floorStart)
            })
            floorStart += (floorStart === 0 ? floorCont + 1 : floorCont);
            var imgPromises = [];
            var pipesPromises = [];
            var jointsPromises = [];
            var holesPromises = [];
            var hangersPromises = [];
            var insulationPipesPromises = [];
            var staplesPipesPromises = [];
            var wiresesPipesPromises = [];
            var wirewesPipesPromises = [];
            var texturesPipesPromises = [];
            floor.rooms && floor.rooms.length > 0 && floor.rooms.forEach((room, roomIndex) => {
                let roomRowSpan =
                    (room.devices ? room.devices.length : 0) +
                    (room.pipes ? room.pipes.length : 0) +
                    (room.joints ? room.joints.length : 0) +
                    (room.hangers ? room.hangers.length : 0) +
                    (room.insulationPipes ? room.insulationPipes.length : 0) +
                    (room.staples ? room.staples.length : 0) +
                    (room.wireses ? room.wireses.length : 0) +
                    (room.wirewes ? room.wirewes.length : 0) +
                    (room.textures ? room.textures.length : 0) +
                    (room.holes ? room.holes.length : 0);
                //console.log(roomRowSpan)
                allRooms.push({
                    startLine: roomStart === 0 ? 2 : roomStart + 1,
                    endLine: roomRowSpan + (roomStart === 0 ? roomStart + 1 : roomStart),
                })
                roomStart += (roomStart === 0 ? roomRowSpan + 1 : roomRowSpan)

                room.devices && this.setImagePromise(room.devices, imgPromises, workbook)
                room.pipes && this.setImagePromise(room.pipes, pipesPromises, workbook)
                room.joints && this.setImagePromise(room.joints, jointsPromises, workbook)
                room.hangers && this.setImagePromise(room.hangers, hangersPromises, workbook)
                room.insulationPipes && this.setImagePromise(room.insulationPipes, insulationPipesPromises, workbook)
                room.staples && this.setImagePromise(room.staples, staplesPipesPromises, workbook)
                room.wireses && this.setImagePromise(room.wireses, wiresesPipesPromises, workbook)
                room.wirewes && this.setImagePromise(room.wirewes, wirewesPipesPromises, workbook)
                room.textures && this.setImagePromise(room.textures, texturesPipesPromises, workbook)
                room.holes && this.setImagePromise(room.holes, holesPromises, workbook)
            });

            allFloorPromse = allFloorPromse.then(result => {
                floorPromise = []
                floorPromise = floorPromise.concat([
                    ...imgPromises,
                    ...pipesPromises,
                    ...jointsPromises,
                    ...hangersPromises,
                    ...holesPromises,
                    ...insulationPipesPromises,
                    ...staplesPipesPromises,
                    ...wiresesPipesPromises,
                    ...wirewesPipesPromises,
                    ...texturesPipesPromises,
                ]);
                console.log('floorPromise length: ' + floorPromise.length);
                return Promise.all(floorPromise).then(result => {
                    console.log('floorpromise result: ' + result);
                    this.progressGaga(true)
                    floor.rooms && floor.rooms.length > 0 && floor.rooms.forEach((room, roomIndex) => {
                        //devices
                        room.devices && room.devices.length > 0 && room.devices.forEach((data, index) => {
                            let floorName = roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                        // pipes
                        room.pipes && room.pipes.length > 0 && room.pipes.forEach((data, index) => {
                            let floorName = (room.devices && room.devices.length > 0) ? '' : roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = (room.devices && room.devices.length > 0) ? '' : index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                        // joints
                        room.joints && room.joints.length > 0 && room.joints.forEach((data, index) => {
                            let floorName = (room.devices && room.devices.length > 0) || (room.pipes && room.pipes.length > 0) ? '' : roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = (room.devices && room.devices.length > 0) || (room.pipes && room.pipes.length > 0) ? '' : index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                        // hangers
                        room.hangers && room.hangers.length > 0 && room.hangers.forEach((data, index) => {
                            let floorName = (room.devices && room.devices.length > 0) || (room.pipes && room.pipes.length > 0) || (room.joints && room.joints.length > 0) ? '' : roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = (room.devices && room.devices.length > 0) || (room.pipes && room.pipes.length > 0) || (room.joints && room.joints.length > 0) ? '' : index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                        // insulationPipes
                        room.insulationPipes && room.insulationPipes.length > 0 && room.insulationPipes.forEach((data, index) => {
                            let floorName = (room.devices && room.devices.length > 0) || (room.pipes && room.pipes.length > 0) || (room.joints && room.joints.length > 0) || (room.hangers && room.hangers.length > 0) ? '' : roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = (room.devices && room.devices.length > 0) || (room.pipes && room.pipes.length > 0) || (room.joints && room.joints.length > 0) || (room.hangers && room.hangers.length > 0) ? '' : index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                        // staples
                        room.staples && room.staples.length > 0 && room.staples.forEach((data, index) => {
                            let floorName = (room.devices && room.devices.length > 0) || (room.pipes && room.pipes.length > 0) || (room.joints && room.joints.length > 0) || (room.hangers && room.hangers.length > 0) || (room.insulationPipes && room.insulationPipes.length > 0) ? '' : roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = (room.devices && room.devices.length > 0) || (room.pipes && room.pipes.length > 0) || (room.joints && room.joints.length > 0) || (room.hangers && room.hangers.length > 0) || (room.insulationPipes && room.insulationPipes.length > 0) ? '' : index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                        // wireses
                        room.wireses && room.wireses.length > 0 && room.wireses.forEach((data, index) => {
                            let floorName = (room.devices && room.devices.length > 0) ||
                                (room.pipes && room.pipes.length > 0) ||
                                (room.joints && room.joints.length > 0) ||
                                (room.hangers && room.hangers.length > 0) ||
                                (room.insulationPipes && room.insulationPipes.length > 0) ||
                                (room.staples && room.staples.length > 0)
                                ? '' : roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = (room.devices && room.devices.length > 0) ||
                                (room.pipes && room.pipes.length > 0) ||
                                (room.joints && room.joints.length > 0) ||
                                (room.hangers && room.hangers.length > 0) ||
                                (room.insulationPipes && room.insulationPipes.length > 0) ||
                                (room.staples && room.staples.length > 0)
                                ? '' : index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                        // wirewes
                        room.wirewes && room.wirewes.length > 0 && room.wirewes.forEach((data, index) => {
                            let floorName = (room.devices && room.devices.length > 0) ||
                                (room.pipes && room.pipes.length > 0) ||
                                (room.joints && room.joints.length > 0) ||
                                (room.hangers && room.hangers.length > 0) ||
                                (room.insulationPipes && room.insulationPipes.length > 0) ||
                                (room.staples && room.staples.length > 0) ||
                                (room.wireses && room.wireses.length > 0)
                                ? '' : roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = (room.devices && room.devices.length > 0) ||
                                (room.pipes && room.pipes.length > 0) ||
                                (room.joints && room.joints.length > 0) ||
                                (room.hangers && room.hangers.length > 0) ||
                                (room.insulationPipes && room.insulationPipes.length > 0) ||
                                (room.staples && room.staples.length > 0) ||
                                (room.wireses && room.wireses.length > 0)
                                ? '' : index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                        // textures
                        room.textures && room.textures.length > 0 && room.textures.forEach((data, index) => {
                            let floorName = (room.devices && room.devices.length > 0) ||
                                (room.pipes && room.pipes.length > 0) ||
                                (room.joints && room.joints.length > 0) ||
                                (room.hangers && room.hangers.length > 0) ||
                                (room.insulationPipes && room.insulationPipes.length > 0) ||
                                (room.staples && room.staples.length > 0) ||
                                (room.wireses && room.wireses.length > 0) ||
                                (room.wirewes && room.wirewes.length > 0)
                                ? '' : roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = (room.devices && room.devices.length > 0) ||
                                (room.pipes && room.pipes.length > 0) ||
                                (room.joints && room.joints.length > 0) ||
                                (room.hangers && room.hangers.length > 0) ||
                                (room.insulationPipes && room.insulationPipes.length > 0) ||
                                (room.staples && room.staples.length > 0) ||
                                (room.wireses && room.wireses.length > 0) ||
                                (room.wirewes && room.wirewes.length > 0)
                                ? '' : index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                        // holes
                        room.holes && room.holes.length > 0 && room.holes.forEach((data, index) => {
                            let floorName = (room.devices && room.devices.length > 0) ||
                                (room.pipes && room.pipes.length > 0) ||
                                (room.hangers && room.hangers.length > 0) ||
                                (room.joints && room.joints.length > 0) ||
                                (room.insulationPipes && room.insulationPipes.length > 0) ||
                                (room.staples && room.staples.length > 0) ||
                                (room.wireses && room.wireses.length > 0) ||
                                (room.wirewes && room.wirewes.length > 0) ||
                                (room.textures && room.textures.length > 0)
                                ? '' : roomIndex === 0 && index === 0 ? floor.floor : '';
                            let roomName = (room.devices && room.devices.length > 0) ||
                                (room.pipes && room.pipes.length > 0) ||
                                (room.hangers && room.hangers.length > 0) ||
                                (room.joints && room.joints.length > 0) ||
                                (room.insulationPipes && room.insulationPipes.length > 0) ||
                                (room.staples && room.staples.length > 0) ||
                                (room.wireses && room.wireses.length > 0) ||
                                (room.wirewes && room.wirewes.length > 0) ||
                                (room.textures && room.textures.length > 0)
                                ? '' : index === 0 ? room.roomName : '';
                            this.addItemRow(data, ws1, floorName, roomName);
                            count += 1;
                            (data.imageId === 0 || data.imageId) && this.addImageRow(data, ws1, count)
                        });
                    });
                    return Promise.resolve();
                });
            });
        });

        allFloorPromse.then(res => {
            allFloors.forEach(item => {
                ws1.mergeCells(item.startLine, 1, item.endLine, 1)
            });
            allRooms.forEach(item => {
                ws1.mergeCells(item.startLine, 2, item.endLine, 2)
            });
            //最主要的灵魂在这里
            workbook.xlsx.writeBuffer()
                .then(buffer => {
                    this.progressGaga(false)
                    let base64 = buffer.toString('base64')
                    // console.log(buffer.toString('base64'))
                    // 使用atob方法解码base64
                    var raw = window.atob(base64);
                    // 创建一个存储解码后数据的数组
                    var uInt8Array = new Uint8Array(raw.length);
                    // blob只能接收二进制编码，需要讲base64转为二进制再塞进去
                    for (var i = 0; i < raw.length; ++i) {
                        uInt8Array[i] = raw.charCodeAt(i);
                    }
                    // 这里给了一个返回值，在别的方法掉用传入base64编码就可以得到转化后的blob
                    const link = document.createElement('a')
                    const blob = new Blob([uInt8Array], { type: 'application/vnd.ms-excel' })
                    link.style.display = 'none'
                    link.href = URL.createObjectURL(blob)
                    //设置下载的Excel表名
                    link.setAttribute('download', this.getPageTitle() + '.xlsx')
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                }).catch(error => {
                    this.progressGaga(false)
                    throw error;
                })
        });
    };

    addItemRow = (data, ws1, floorName, roomName) => {
        ws1.addRow([
            floorName,
            roomName,
            '',
            data.materialNo,
            data.deviceName,
            data.specifications,
            data.category,
            data.brand,
            data.series,
            data.number,
            data.length,
            data.unit,
            data.unitPrice,
            data.totalPrice,
            data.note,
        ]).height = 30;
        this.progressGaga(true)
    };Ï
