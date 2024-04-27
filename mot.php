<?php
	// include('connect.php');
    // $connect = new Connect;
	// $select = "SELECT P.DS_ENDERECO , C.DS_CIDADE , C.UF , U.IPMAC  FROM PESSOA P, CIDADE C , USUARIO U WHERE P.CD_PESSOA =".$_POST['mot']." AND P.CD_CIDADE = C.CD_CIDADE AND p.CD_PESSOA = u.CD_PESSOA  ";
    // $data = $connect->conectar($select);
	// $endereco = $data[0]["DS_ENDERECO"]." - ".$data[0]["DS_CIDADE"].", ".$data[0]["UF"];
	// $endereco = str_replace(".","",$endereco);
	// $ipmac = $data[0]["IPMAC"];
	// Directory
	// $directory = "../c/coords/".$_POST['mot']."/";
	// // Returns an array of files
	// $files = scandir($directory);
	// $diretorio = dir($directory);
	// // Count the number of files and store them inside the variable..
	// $count_files = count($files);
	// $i = 0;

	// while(($arquivo = $diretorio->read()) !== false) {
	// 	if($i==($count_files)-1){
	// 		$arq = $arquivo;
	// 	}
	// 	$i += 1;
	// }
	// $diretorio->close();
	// $dir = $directory.$arq;
	// $arquivo =  file($dir);
	// $ultima_linha = count($arquivo);
	// echo $arquivo[$ultima_linha-1]."#".$endereco."#".$ipmac;


	$diretorio = "coords/";
	$retorno = "";
	$i = 0;
	if (is_dir($diretorio)) {
		if ($handle = opendir($diretorio)) {
			while (($item = readdir($handle)) !== false) {
				if (is_dir($diretorio."/".$item) && $item != '.' && $item != '..') {
				
					$dir = 'coords/'.$item;
					$arquivos = scandir($dir);
					$arq = array_pop($arquivos);
					$caminho_arquivo = $dir . '/' . $arq;
					if(file_exists($caminho_arquivo) && is_file($caminho_arquivo) && pathinfo($caminho_arquivo, PATHINFO_EXTENSION) == 'txt'){
						$linhas = file($caminho_arquivo);
						$ultima_linha = trim($linhas[count($linhas)-1]);
						if($i == 0){
							$retorno .= $item.",".$ultima_linha;
						}else{
							$retorno .= "#".$item.",".$ultima_linha;
						}
						$i+=1;
					}

				}
			}
			closedir($handle);
		}
	}

	echo $retorno;
	
	
?>