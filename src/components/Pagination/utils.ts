function getCell(index, count, type, direction?) {
  return {
    index, count, type, direction
  }
}

export function getLimitUpCell(remainder, current: number, totalPage: number, pageSize: number) {
  let showDotArr = [], now = current, index = 1;
  if (current <= 4) {
    while (index <= now) {
      showDotArr.push(getCell(index, pageSize, 'number'));
      index++;
    }
    showDotArr = showDotArr.concat([
      getCell(current + 1, pageSize, 'number'),
      getCell(current + 2, pageSize, 'number'),
      getCell(null, null, 'omit', 'right'),
      getCell(totalPage, remainder ? remainder : pageSize, 'number')]);
    if (current < 4) {
      showDotArr = [
        getCell(1, pageSize, 'number'),
        getCell(2, pageSize, 'number'),
        getCell(3, pageSize, 'number'),
        getCell(4, pageSize, 'number'),
        getCell(5, pageSize, 'number'),
        getCell(null, null, 'omit', 'right'),
        getCell(totalPage, remainder ? remainder : pageSize, 'number'),
      ]
    }
  } else if (totalPage - current <= 3) {
    showDotArr = [
      getCell(1, pageSize, 'number'),
      getCell(null, null, 'omit', 'left'),
      getCell(current - 2, pageSize, 'number'),
      getCell(current - 1, pageSize, 'number')];
    while (now <= totalPage) {
      showDotArr.push(getCell(now, pageSize, 'number'));
      if (now == totalPage) {
        showDotArr[showDotArr.length-1] = getCell(now, remainder ? remainder : pageSize, 'number');
      }
      now++
    }
    if (totalPage - current <= 2) {
      showDotArr = [
        getCell(1, pageSize, 'number'),
        getCell(null, null, 'omit','left'),
        getCell(totalPage - 4, pageSize, 'number'),
        getCell(totalPage - 3, pageSize, 'number'),
        getCell(totalPage - 2, pageSize, 'number'),
        getCell(totalPage - 1, pageSize, 'number'),
        getCell(totalPage, remainder ? remainder : pageSize, 'number')]
    }
  } else {
    return [
      getCell(1, pageSize, 'number'),
      getCell(null, null, 'omit','left'),
      getCell(current - 2, pageSize, 'number'),
      getCell(current - 1, pageSize, 'number'),
      getCell(current, pageSize, 'number'),
      getCell(current + 1, pageSize, 'number'),
      getCell(current + 2, pageSize, 'number'),
      getCell(null, null, 'omit','right'),
      getCell(totalPage, remainder ? remainder : pageSize, 'number')]
  }
  return showDotArr
}

export function getLimitDownCell(remainder, pageSize, length) {
  var cellArray = [];
  for (var i = 1; i <= length; i++) {
    if (remainder > 0) {
      if (i == length) {
        cellArray[length] = getCell(i, remainder ? remainder : pageSize, 'number');
        return;
      }
      cellArray.push(getCell(i, pageSize, 'number'));
    } else {
      cellArray.push(getCell(i, pageSize, 'number'));
    }
  }
  return cellArray
}
export function recoverToLimit(max,min=1,num) {
     return Math.max(min,Math.min(max,num))
}
