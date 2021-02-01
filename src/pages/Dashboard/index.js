import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCheck, MdClose } from 'react-icons/all';
import swal from 'sweetalert';

import InputMask from 'react-input-mask';
import Combobox from 'react-widgets/lib/Combobox';

import {
  getCnpjs,
  setCnpjs,
  gravarCnpj,
  getBanco,
} from '~/store/modules/auth/actions';

import Loader from '../../components/Loader';

import {
  Container,
  Infocnpj,
  Conjunto,
  Title,
  ContainerStatus,
  Vazio,
  Conjunto2,
  Brasao,
} from './styles';

import Logo from '../../assets/brasao.gif';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [cnpj, setCnpj] = useState(null);
  const [dados, setDados] = useState(null);

  const { info, situacao, drop, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getCnpjs());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [situacao]);

  // eslint-disable-next-line consistent-return
  const enviarCnpj = () => {
    if (cnpj === null) {
      return swal({
        icon: 'error',
        text: 'CNPJ não pode ser vázio.',
      });
    }

    if (cnpj.replace(/([^\d])+/gim, '').length !== 14) {
      return swal({
        icon: 'error',
        text: 'CNPJ deve conter 14 caractéres.',
      });
    }

    dispatch(setCnpjs(cnpj.replace(/([^\d])+/gim, ''), true));
    setCnpj(null);
  };

  // eslint-disable-next-line consistent-return
  const enviarDados = () => {
    if (dados === null) {
      return swal({
        icon: 'error',
        text: 'CNPJ não pode ser vázio.',
      });
    }

    dispatch(getBanco(dados));
    setDados(null);
  };

  const gravarCnpjs = () => {
    dispatch(
      gravarCnpj({
        cnpj: info.cnpj.replace(/([^\d])+/gim, ''),
        tipo: info.tipo,
        abertura: info.abertura.toString(),
        nome: info.nome,
        fantasia: info.fantasia,
        porte: info.porte,
        atividade_principal: info.atividade_principal,
        atividades_secundarias: info.atividades_secundarias,
        natureza_juridica: info.natureza_juridica,
        logradouro: info.logradouro,
        numero: info.numero,
        complemento: info.complemento,
        cep: info.cep,
        bairro: info.bairro,
        municipio: info.municipio,
        uf: info.uf,
        email: info.email,
        telefone: info.telefone,
        situacao: info.situacao,
        data_situacao: info.data_situacao.toString(),
        motivo_situacao: info.motivo_situacao,
      })
    );
  };

  return (
    <Container>
      <header>
        <p>
          <strong>Escolha onde deseja procurar o CNPJ:</strong>
        </p>
        <Conjunto2>
          <div>
            <InputMask
              type="text"
              placeholder="  Cnpj"
              mask="99.999.999/9999-99"
              onChange={e => setCnpj(e.target.value)}
              style={{
                padding: '20px, 20px, 20px, 20px',
                borderRadius: 5,
                borderColor: '#cccccc',
                width: 150,
                height: 40,
                borderTopWidth: 1,
                borderTopColor: '#cccccc',
                borderLeftWidth: 1,
                borderLeftColor: '#cccccc',
              }}
              value={cnpj || ''}
            />
            <div>
              <button
                type="button"
                onClick={() => enviarCnpj()}
                style={{ marginTop: 15, marginRight: 25 }}
              >
                Busca na Receita
              </button>
            </div>
          </div>
          <p>
            <Combobox
              // busy={isSearching}
              data={drop}
              onChange={value => setDados(value.cnpj || value)}
              minLength={14}
              // style={{}}
              caseSensitive={false}
              textField={item =>
                typeof item === 'string' ? item : `${item.cnpj} - ${item.nome}`
              }
              valueField={item => item.cnpj}
              filter="contains"
              style={{
                marginTop: 15,
                padding: '20px, 20px, 20px, 20px',
                borderRadius: 5,
                color: '#cccccc',
                width: 300,
                height: 40,
              }}
              value={dados || ''}
            />
            <button
              type="button"
              onClick={() => enviarDados()}
              style={{ marginTop: 15 }}
            >
              Encontre no Banco SQL
            </button>
          </p>
        </Conjunto2>
      </header>
      {info.status !== 'ERROR' ? (
        <>
          <ContainerStatus>
            {situacao ? (
              <AiOutlineCheck size={30} color="green" />
            ) : (
              <MdClose size={30} color="red" />
            )}
            {situacao ? (
              <spam style={{ color: '#008000' }}>
                Este CNPJ já está salvo em nosso banco.
              </spam>
            ) : (
              <spam style={{ color: '#FF0000' }}>
                Este CNPJ ainda não foi salvo.
              </spam>
            )}
            {!situacao && (
              <button
                type="button"
                disabled={situacao}
                onClick={() => gravarCnpjs()}
              >
                Salvar
              </button>
            )}
          </ContainerStatus>

          <Infocnpj>
            <Brasao>
              <img
                src={Logo}
                alt=""
                style={{
                  textAlign: 'left !important',
                  paddingTop: 30,
                }}
              />
              <h1
                style={{
                  marginLeft: 81,
                  textAlign: 'center !important',
                }}
              >
                REPÚBLICA FEDERATIVA DO BRASIL
              </h1>
            </Brasao>
            <h2
              style={{
                marginBottom: 30,
                textAlign: 'center !important',
              }}
            >
              CADASTRO NACIONAL DA PESSOA JURÍDICA
            </h2>

            <Conjunto>
              <p>
                <Title>NÚMERO DE INSCRIÇÃO</Title>
                <p>
                  {info.cnpj
                    .replace(/([^\d])+/gim, '')
                    .replace(/(\d{2})?(\d{3})?(\d{3})?(\d{4})/, '$1.$2.$3/$4-')}
                </p>{' '}
                <p>{info.tipo}</p>
              </p>
              <h3>COMPROVANTE DE INSCRIÇÃO E DE SITUAÇÃO CADASTRAL</h3>
              <p>
                <Title>DATA DE ABERTURA</Title>
                <p>{info.abertura}</p>
              </p>
            </Conjunto>
            {/* */}
            <Conjunto>
              <p>
                <Title>NOME EMPRESARIA</Title>
                <p>{info.nome}</p>
              </p>
            </Conjunto>
            {/* */}
            <Conjunto>
              <p>
                <Title>TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)</Title>
                <p>{info.fantasia}</p>
              </p>
              <p>
                <Title>PORTE</Title>
                <p>{info.porte === 'MICRO EMPRESA' ? 'ME' : info.porte}</p>
              </p>
            </Conjunto>
            <Conjunto>
              <p>
                <Title>
                  CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL
                </Title>
                {info.atividade_principal && (
                  <p>
                    {info.atividade_principal[0].code} -{' '}
                    {info.atividade_principal[0].text}
                  </p>
                )}
              </p>
            </Conjunto>
            <Conjunto>
              <p>
                <Title>
                  CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS
                </Title>
                {info.atividades_secundarias && (
                  <p>
                    {info.atividades_secundarias.map(item => (
                      <p>
                        {item.code} - {item.text}
                      </p>
                    ))}
                  </p>
                )}
              </p>
            </Conjunto>
            <Conjunto>
              <p>
                <Title>CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA</Title>
                <p>{info.natureza_juridica}</p>
              </p>
            </Conjunto>
            {/* */}
            <Conjunto>
              <p>
                <Title>LOGRADOURO</Title>
                <p>{info.logradouro}</p>
              </p>
              <p>
                <Title>NÚMERO</Title>
                <p>{info.numero}</p>
              </p>
              <p>
                <Title>COMPLEMENTO</Title>
                <p>{info.complemento}</p>
              </p>
            </Conjunto>
            {/* */}
            <Conjunto>
              <p>
                <Title>CEP</Title>
                <p>
                  {info.cep
                    .toString()
                    .replace(/([^\d])+/gim, '')
                    .replace(/(\d{2})?(\d{3})/, '$1.$2-')}
                </p>
              </p>
              <p>
                <Title>BAIRRO/DISTRITO</Title>
                <p>{info.bairro}</p>
              </p>
              <p>
                <Title>MUNICÍPIO</Title>
                <p>{info.municipio}</p>
              </p>
              <p>
                <Title>UF</Title>
                <p>{info.uf}</p>
              </p>
            </Conjunto>
            {/* */}
            <Conjunto>
              <p>
                <Title>ENDEREÇO ELETRÔNICO</Title>
                <p>{info.email}</p>
              </p>
              <p>
                <Title>TELEFONE</Title>
                <p>
                  {info.telefone
                    .toString()
                    .replace(/([^\d])+/gim, '')
                    .replace(/(\d{0})?(\d{2})?(\d{4})/, '$1($2) $3 - ')}
                </p>
              </p>
            </Conjunto>
            {/* */}
            <Conjunto>
              <p>
                <Title>ENTE FEDERATIVO RESPONSÁVEL (EFR)</Title>
                <p>********</p>
              </p>
            </Conjunto>
            {/* */}
            <Conjunto>
              <p>
                <Title>SITUAÇÃO CADASTRAL</Title>
                <p>{info.situacao}</p>
              </p>
              <p>
                <Title>DATA DA SITUAÇÃO CADASTRAL</Title>
                <p>{info.data_situacao}</p>
              </p>
            </Conjunto>
            {/* */}
            <Conjunto>
              <p>
                <Title>MOTIVO DE SITUAÇÃO CADASTRAL</Title>
                <p>{info.motivo_situacao}</p>
              </p>
            </Conjunto>
            {/* */}
            <Conjunto>
              <p>
                <Title>SITUAÇÃO ESPECIAL</Title>
                <p>********</p>
              </p>
              <p>
                <Title>DATA DA SITUAÇÃO ESPECIAL</Title>
                <p>********</p>
              </p>
            </Conjunto>
          </Infocnpj>
        </>
      ) : (
        <Vazio>Nenhum item encontrado. Inicie uma nova busca pelo CNPJ.</Vazio>
      )}
      {loading && <Loader show />}
    </Container>
  );
}
