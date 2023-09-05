export abstract class MessageUtils {

  static CARD = {
    DELETE_SUCCESS: 'Carta excluída com sucesso!',
    SAVE_SUCCESS: 'Carta cadastrada com sucesso!',
  }

  static USER = {
    SAVE_SUCCESS: 'Usuário cadastrado com sucesso!',
    UPDATE_SUCCESS: 'Dados do usuário atualizados com sucesso!',
  }

  static getMessage(error: any): string {
    if (Array.isArray(error.erro)) {
      return error.error[0].message;
    }

    return error.error.message;
  }
}
