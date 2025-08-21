
import { useState, useEffect } from 'react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'

interface User {
  userId: string
  email: string
  userName: string
  createdTime: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(lumi.auth.user)
  const [isAuthenticated, setIsAuthenticated] = useState(lumi.auth.isAuthenticated)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = lumi.auth.onAuthChange(({ isAuthenticated, user }) => {
      setIsAuthenticated(isAuthenticated)
      setUser(user)
    })
    return unsubscribe
  }, [])

  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('A senha deve ter pelo menos 8 caracteres')
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula')
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra minúscula')
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('A senha deve conter pelo menos um número')
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('A senha deve conter pelo menos um caractere especial')
    }
    
    return { isValid: errors.length === 0, errors }
  }

  const signIn = async () => {
    setLoading(true)
    try {
      const result = await lumi.auth.signIn()
      toast.success('Login realizado com sucesso!')
      return result
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    lumi.auth.signOut()
    toast.success('Logout realizado com sucesso!')
  }

  return {
    user,
    isAuthenticated,
    loading,
    signIn,
    signOut,
    validatePassword
  }
}
