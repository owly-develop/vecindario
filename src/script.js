async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImE4NzU2YjJiLTQ5ZTYtNGRjZC1hNWZhLTNjNjIwYzhhYTQzOCIsInNsdWciOiJvd2x5LWRlbW8iLCJlbWFpbCI6InBhYmxvQG93bHkuY29tLmNvIiwidXNlcl9pZCI6IjZiMTUzMjg3LWY1OGUtNGYzNS1hNDMxLTU5ZGUwMzI0NThhZiIsImV4cCI6MTg1NTM0MDkyOSwiY3JlYXRlZCI6MTY5NzY2MDkyOX0.8PxqI9P17dIWTf7_3QWOkmx2voPWyu9ahDQCJX_2xN6g5k6_Lr-tSsSiI6yaqXGxVx4lEmuTy6Z0y9smEgeJzA'
        }
    })
    return response.json()
}

const formatNumberES = (n, d = 0) => {
    n = new Intl.NumberFormat('es-ES').format(parseFloat(n).toFixed(d))

    if (d > 0) {
        const decimals = n.indexOf(',') > -1 ? n.length - 1 - n.indexOf(',') : 0
        n = decimals == 0 ? n + ',' + '0'.repeat(d) : n + '0'.repeat(d - decimals)
    }
    return n
}

// Sección de inicio (funciones)

const formatTowerType = text => {
    if (text.includes('_')) {
        const array = text.split('_')
        array.forEach((element, index, array) => {
            array[index] = element[0].toUpperCase() + element.slice(1)
        })
        return array.join(' ')
    }
    return 'Proyecto ' + text[0].toUpperCase() + text.slice(1)
}

const formatDate = date => {
    const [year, month] = date.split('-')
    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ]
    return `${months[month - 1]} de ${year}`
}

const getMinimumPrice = array => {
    let minimumPrice
    if (array.every(e => e.availability === 'sold')) {
        array.forEach((element, i) => {
            if (i === 0) minimumPrice = element.precio_final
            if (element.precio_final < minimumPrice) {
                minimumPrice = element.precio_final
            }
        })
    } else {
        array.forEach((element, i) => {
            if (element.availability !== 'sold' && !minimumPrice)
                minimumPrice = element.precio_final
            if (element.availability !== 'sold' && element.precio_final <= minimumPrice) {
                minimumPrice = element.precio_final
            }
        })
    }
    return `${formatNumberES(minimumPrice)}`
}

const getAreas = (array, attribute) => {
    let min, max
    if (array.every(e => e.availability === 'sold')) {
        array.forEach((element, i) => {
            if (i === 0) {
                min = element[attribute]
                max = element[attribute]
            }
            if (element[attribute] < min) {
                min = element[attribute]
            }
            if (element[attribute] > max) {
                max = element[attribute]
            }
        })
    } else {
        array.forEach(element => {
            if (element.availability !== 'sold' && !min) {
                min = element[attribute]
            }
            if (element.availability !== 'sold' && !max) {
                max = element[attribute]
            }
            if (element.availability !== 'sold' && element[attribute] < min) {
                min = element[attribute]
            }
            if (element.availability !== 'sold' && element[attribute] > max) {
                max = element[attribute]
            }
        })
    }
    return min === max ? `${max} m²` : `${min} a ${max} m²`
}

const enumerator = (array, attribute) => {
    let quantities = []
    if (array.every(e => e.availability === 'sold')) {
        array.forEach((element, i) => {
            if (i === 0) {
                quantities.push(element[attribute])
            }
            if (!quantities.includes(element[attribute])) {
                quantities.push(element[attribute])
            }
        })
    } else {
        array.forEach((element, i) => {
            if (element.availability !== 'sold' && !quantities.includes(element[attribute])) {
                quantities.push(element[attribute])
            }
        })
    }
    if (quantities.length === 1) return quantities[0]
    quantities.sort((a, b) => a - b)
    const last = quantities.pop()
    return quantities.join(', ') + ' y ' + last
}

const pathname = window.location.pathname

if (pathname === '/') {
    // Sección de inicio
    const towerType = document.getElementById('tower-type')
    const totalTowers = document.getElementById('total-towers')
    const deadline = document.getElementById('deadline')

    const totalProperties = document.getElementById('total-properties')
    const minimumPrice = document.getElementById('minimum-price')
    const areas = document.getElementById('areas')
    const bedrooms = document.getElementById('bedrooms')
    const bathrooms = document.getElementById('bathrooms')

    getData(
        'https://inventario.api.vecindariosuite.com/api_public/v1/proyectos/owly-demo/torres'
    ).then(data => {
        if (towerType) towerType.innerHTML = formatTowerType(data[0].tipo_de_torre)
        if (totalTowers) totalTowers.innerHTML = data.length
        if (deadline) deadline.innerHTML = formatDate(data[0].fecha_de_entrega)
		console.log(data);
    })

    getData(
        'https://inventario.api.vecindariosuite.com/api_public/v1/proyectos/owly-demo/torres/58b4ea62-681d-46f1-adf0-b125997e38fc/inmuebles'
    ).then(data => {
        if (totalProperties) totalProperties.innerHTML = data.length
        if (minimumPrice) minimumPrice.innerHTML = getMinimumPrice(data)
        if (areas) areas.innerHTML = getAreas(data, 'area_construida')
        if (bedrooms) bedrooms.innerHTML = enumerator(data, 'alcobas')
        if (bathrooms) bathrooms.innerHTML = enumerator(data, 'banos')
    })
} else {
    const secondParam = pathname.split('/')[2]
    if (secondParam) {
        const [isType, type] = secondParam.split('-')
        if (isType === 'tipo') {
            // Sección de tipologías

            const typeName = document.getElementById('type-name')
            const typeMinPrice = document.getElementById('type-min-price')
            const builtArea = document.getElementById('built-area')
            const privateArea = document.getElementById('private-area')
            const typeBedrooms = document.getElementById('type-bedrooms')
            const typeBathrooms = document.getElementById('type-bathrooms')
            getData(
                'https://inventario.api.vecindariosuite.com/api_public/v1/proyectos/owly-demo/torres/58b4ea62-681d-46f1-adf0-b125997e38fc/inmuebles'
            ).then(data => {
                const dataByType = []
                data.forEach(element => {
                    if (element.tipo.toUpperCase() === type.toUpperCase()) dataByType.push(element)
                })
                if (typeName && dataByType.length) typeName.innerHTML = `Tipo ${dataByType[0].tipo}`
                if (typeMinPrice) typeMinPrice.innerHTML = getMinimumPrice(dataByType)
                if (builtArea) builtArea.innerHTML = getAreas(dataByType, 'area_construida')
                if (privateArea) privateArea.innerHTML = getAreas(dataByType, 'area_privada')
                if (typeBedrooms) typeBedrooms.innerHTML = enumerator(dataByType, 'alcobas')
                if (typeBathrooms) typeBathrooms.innerHTML = enumerator(dataByType, 'banos')
            })

            // if (tipo.split('-')[1] === 'a' ) console.log(tipo);
        }
    }
}
