import React, { useEffect, useState } from 'react'
import { getTherapisName } from '../../utils/Api'
import 'firebase/auth'
import './FooterName.scss'

export default function FooterName(props) {
  const { user } = props
  const [therapistName, setTherapistName] = useState('')

  useEffect(() => {
    getTherapisName(user.email).then((response) => {
      setTherapistName(response.data().nombrepsicologo)
    })
  }, [user])

  return <h4>Actualmente tu psicologo es {therapistName}. </h4>
}
